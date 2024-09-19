import { useCallback, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle, useMap, useMapEvent } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { WorldMapStyle } from './WorldMap.styles';
import 'leaflet/dist/leaflet.css';
import useFetchVolcanoes from '../../hooks/useFetchVolcanoes';
import useFetchSamples from '../../hooks/useFetchSamples';
import TruncatedDescription from './TruncatedDescription';
import { useEventHandlers } from '@react-leaflet/core';
import tokml from 'tokml';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import natural_sample from '../../assets/images/natural_sample.png';
import experimental_sample from '../../assets/images/experimental_sample.png';

// CSS classes for positioning map controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
};

// Style for the rectangle bounds on the minimap
const BOUNDS_STYLE = { weight: 1 };

/**
 * MinimapBounds: A component that draws a rectangle on the minimap to represent the bounds of the main map.
 * 
 * @param {object} parentMap - The main map whose bounds are represented on the minimap.
 * @param {number} zoom - The zoom level of the minimap.
 * 
 * @returns {JSX.Element} - A JSX element rendering the rectangle on the minimap.
 */
function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap(); // Get the Leaflet map instance for the minimap

    // Update the main map's view when the minimap is clicked
    const onClick = useCallback((e) => {
        parentMap.setView(e.latlng, parentMap.getZoom());
    }, [parentMap]);

    useMapEvent('click', onClick); // Register click event on minimap

    const [bounds, setBounds] = useState(parentMap.getBounds()); // State to track bounds of main map

    // Update bounds and view on main map change
    const onChange = useCallback(() => {
        setBounds(parentMap.getBounds());
        minimap.setView(parentMap.getCenter(), zoom);
    }, [minimap, parentMap, zoom]);

    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [onChange]);
    useEventHandlers({ instance: parentMap }, handlers); // Register move and zoom event handlers

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />; // Render rectangle on minimap
}

/**
 * MinimapControl: A component that provides a minimap control for the main map.
 * 
 * @param {string} position - Position of the minimap on the main map.
 * @param {number} zoom - Zoom level for the minimap.
 * @param {array} volcanoMarkers - Array of volcano marker data.
 * @param {array} sampleMarkers - Array of sample marker data.
 * 
 * @returns {JSX.Element} - A JSX element rendering the minimap control.
 */
function MinimapControl({ position, zoom, volcanoMarkers, sampleMarkers }) {
    const parentMap = useMap(); // Get the main map instance
    const mapZoom = zoom || 0; // Default zoom level if not provided

    // Create minimap with markers
    const minimap = useMemo(() => (
        <MapContainer
            style={{ height: 80, width: 80 }} // Minimap size
            center={parentMap.getCenter()} // Center of minimap
            zoom={mapZoom} // Zoom level of minimap
            dragging={false} // Disable dragging on minimap
            doubleClickZoom={false} // Disable double-click zoom on minimap
            scrollWheelZoom={false} // Disable scroll wheel zoom on minimap
            attributionControl={false} // Disable attribution control
            zoomControl={false} // Disable zoom control
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> // Tile layer for minimap
            <MinimapBounds parentMap={parentMap} zoom={mapZoom} /> // Bounds for minimap
            {volcanoMarkers.map(volcano => (
                <Marker
                    key={volcano['_id']}
                    position={[parseFloat(volcano['volc_slat']), parseFloat(volcano['volc_slon'])]}
                    icon={
                        new Icon({
                            iconUrl: 'https://cdn-icons-png.freepik.com/256/13570/13570233.png', // Volcano icon
                            iconSize: [10, 10], // Icon size
                        })
                    }
                />
            ))}
            {sampleMarkers.map(sample => (
                <Marker
                    key={sample['_id']}
                    position={[parseFloat(sample['afe_lat']), parseFloat(sample['afe_lon'])]}
                    icon={
                        new Icon({
                            iconUrl: sample['afe_code'].endsWith('-EXP') ? experimental_sample : natural_sample, // Conditional icon
                            iconSize: [10, 10], // Icon size
                        })
                    }
                />
            ))}
        </MapContainer>
    ), [parentMap, mapZoom, volcanoMarkers, sampleMarkers]);

    // Determine CSS class for minimap position
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{minimap}</div> {/* Render minimap control */}
        </div>
    );
}

/**
 * WorldMap: Main component that displays the world map with volcanoes and samples.
 * 
 * @param {string} visibilityMode - Mode used to determine styles for truncated descriptions.
 * 
 * @returns {JSX.Element} - A JSX element rendering the world map with various controls and markers.
 */
function WorldMap({ visibilityMode }) {
    const classes = WorldMapStyle(); // Get custom styles for the map

    // Define icons for volcanoes and samples
    const volcanoIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.freepik.com/256/13570/13570233.png',
        iconSize: [10, 10],
    });

    // Fetch data for volcanoes and samples
    const { volcanoes, isLoadingVolcanoes } = useFetchVolcanoes();
    const { samples } = useFetchSamples();

    // Define icons for natural and experimental samples
    const naturalIcon = new Icon({
        iconUrl: natural_sample,
        iconSize: [10, 10],
    });

    const experimentalIcon = new Icon({
        iconUrl: experimental_sample,
        iconSize: [10, 10],
    });

    /**
     * handleExportKML: Converts volcano and sample data to KML format and triggers download.
     */
    const handleExportKML = () => {
        // Create KML features for volcanoes
        const volcanoFeatures = volcanoes.map(volcano => ({
            type: 'Feature',
            properties: {
                name: volcano['volc_name'],
                country: volcano['volc_country'],
                type: volcano['volc_type'],
                composition: volcano['volc_rtype'],
                description: `
                    ${volcano['volc_desc']}
                    <br/>
                    <a href="https://volcashdb.ipgp.fr">VolcAshDB website</a>
                    <p>Source: <a href=https://volcano.si.edu/volcano.cfm?vn=${volcano['volc_num']} target="_blank" rel="noopener noreferrer">Smithsonian Institution</a></p>
                    <p>Citation: <a href="https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2" target="_blank" rel="noopener noreferrer">https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2</a></p>`
            },
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(volcano['volc_slon']), parseFloat(volcano['volc_slat'])]
            }
        }));

        // Create KML features for samples
        const sampleFeatures = samples.map(sample => ({
            type: 'Feature',
            properties: {
                name: sample['afe_code'],
                eruptive_style: sample['eruptive_style'],
                description: `
                <a href="https://volcashdb.ipgp.fr">VolcAshDB website</a>`
            },
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(sample['afe_lon']), parseFloat(sample['afe_lat'])]
            }
        }));

        // Combine features into a FeatureCollection
        const featureGroup = {
            type: 'FeatureCollection',
            features: [...volcanoFeatures, ...sampleFeatures]
        };

        // Convert feature collection to KML
        const kml = tokml(featureGroup, { documentName: 'VolcashDB', name: 'name', description: 'description' });

        // Create a downloadable link for the KML file
        const convertedData = 'application/vnd.google-earth.kml+xml;charset=utf-8,' + encodeURIComponent(kml);

        const link = document.createElement('a');
        link.setAttribute('href', 'data:' + convertedData);
        link.setAttribute('download', 'volcashDB.kml');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Display loading state while fetching volcanoes
    if (isLoadingVolcanoes) {
        return <div>Loading...</div>;
    }

    // Display message if no volcanoes are found
    if (!volcanoes || volcanoes.length === 0) {
        return <div>No volcanoes found</div>;
    }

    return (
        <MapContainer center={[35, 0]} zoom={2} scrollWheelZoom={true} style={{ height: "400px", width: "80%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Render sample markers */}
            {samples.map(sample => (
                <Marker
                    key={sample['_id']}
                    position={[parseFloat(sample['afe_lat']), parseFloat(sample['afe_lon'])]}
                    icon={sample['afe_code'].endsWith('-EXP') ? experimentalIcon : naturalIcon}
                >
                    <Popup>
                        <div>
                            <h3>
                                <Link to='/catalogue'>
                                    {sample['afe_code']}
                                </Link>
                            </h3>
                            <p>Eruptive Style: {sample['eruptive_style']}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            {/* Render volcano markers */}
            {volcanoes.map(volcano => (
                <Marker
                    key={volcano['_id']}
                    position={[parseFloat(volcano['volc_slat']), parseFloat(volcano['volc_slon'])]}
                    icon={volcanoIcon}
                >
                    <Popup>
                        <div>
                            <h3>
                                <Link to='/catalogue'>
                                    {volcano['volc_name']}, {volcano['volc_country']}
                                </Link>
                            </h3>
                            <p>Type: {volcano['volc_type']}</p>
                            <p>Composition: {volcano['volc_rtype']}</p>
                            <TruncatedDescription text={volcano['volc_desc']} maxLength={100} visibilityMode={visibilityMode} />
                            <p>Source: <a href={`https://volcano.si.edu/volcano.cfm?vn=${volcano['volc_num']}`} target="_blank" rel="noopener noreferrer">Smithsonian Institution</a></p>
                            <p>Citation: <a href="https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2" target="_blank" rel="noopener noreferrer">https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2</a></p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            <MinimapControl position="topright" volcanoMarkers={volcanoes} sampleMarkers={samples} />
            <div className={`${POSITION_CLASSES.topleft} ${classes.DownloadContainer}`}>
                <Tooltip title="Download KML file">
                    <div className={`${classes.customDownloadButton} leaflet-control leaflet-bar`} onClick={handleExportKML}>
                        <DownloadIcon fontSize='small' />
                    </div>
                </Tooltip>
            </div>

            <div className={`${POSITION_CLASSES.bottomleft} ${classes.legendContainer}`}>
                <div className={classes.legend}>
                    <div className={classes.legendItem}>
                        <strong>Legend:</strong>
                        <span className={classes.legendSpan}>
                            <img className={classes.legendImg} src='https://cdn-icons-png.freepik.com/256/13570/13570233.png' alt='Volcano Icon'/>
                            Volcano
                        </span>
                        <span className={classes.legendSpan}>
                            <img className={classes.legendImg} src={natural_sample} alt='Natural Sample Icon'/>
                            Natural sample
                        </span>
                        <span className={classes.legendSpan}>
                            <img className={classes.legendImg} src={experimental_sample} alt='Experimental Sample Icon'/>
                            Experimental sample
                        </span>
                    </div>
                </div>
            </div>
        </MapContainer>
    );
}

export default WorldMap;
