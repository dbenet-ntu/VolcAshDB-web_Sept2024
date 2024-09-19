import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import RiseLoader from "react-spinners/RiseLoader";
import { useMediaQuery } from 'react-responsive';
import { useLoading } from '../../hooks/useLoading';
import * as constants from "../../Constants";

/**
 * TimeLine: A component for displaying eruption and sample data over time using Plotly.
 * 
 * @param {object} props - Properties passed to the component.
 * @param {function} props.onPassVolcName - Function to get the volcano name.
 * @param {function} props.onEruptions - Function to get eruption data.
 * @param {function} props.onAFES - Function to get AFE (Ash Fall Events) data.
 * @param {object} props.visibilityMode - Object controlling visibility settings.
 * @param {function} props.handleSearch - Function to handle search actions.
 * @param {array} props.selectedTags - Array of selected tags.
 * @param {object} props.tagsRef - Ref to tag selection component.
 */
const TimeLine = (props) => {
    const vol = props.onPassVolcName(); // Get the volcano name from props
    const eruptions = props.onEruptions(); // Get eruption data from props
    const afes = props.onAFES(); // Get AFE data from props
    const [plotData, setPlotData] = useState([]); // State for Plotly data
    const [selectedData, setSelectedData] = useState('new'); // Toggle between 'new' and 'old' data views
    const { load, loading } = useLoading(); // Custom hook for loading state management

    // Media queries for responsive design
    const isXLScreen = useMediaQuery({ query: '(min-width: 1920px)' });
    const isLargeScreen = useMediaQuery({ query: '(max-width: 1919.95px)' });
    const isMediumScreen = useMediaQuery({ query: '(max-width: 1279.95px)' });
    const isSmallScreen = useMediaQuery({ query: '(max-width: 959.95px)' });
    const isXSScreen = useMediaQuery({ query: '(max-width: 599.95px)' });

    const [width, setWidth] = useState(); // State for Plotly chart width
    const [flag, setFlag] = useState(false); // Flag to trigger search

    // Update chart width based on screen size
    useEffect(() => {
        if (isXSScreen) setWidth(400);
        else if (isSmallScreen || isMediumScreen) setWidth(550);
        else if (isLargeScreen || isXLScreen) setWidth(750);
    }, [isXSScreen, isSmallScreen, isMediumScreen, isLargeScreen, isXLScreen]);

    // Update plot data when component mounts or data changes
    useEffect(() => {
        load([eruptions, afes]); // Load data using custom hook

        if (!loading) {
            const eruptionsPeriodGeologicalRecord = [];
            const check_eruption_geological_record = {};

            eruptions.forEach((eruption) => {
                const startEruption = eruption.ed_yearsBP;
                if (eruption.volc_num === vol && !check_eruption_geological_record[startEruption]) {
                    check_eruption_geological_record[startEruption] = true;
                    eruptionsPeriodGeologicalRecord.push(-startEruption);
                }
            });

            const eruptionsPeriodHistoricalRecord = eruptions
                .filter(
                    (eruption) =>
                        eruption.volc_num === vol &&
                        eruption.ed_stime &&
                        !eruption.ed_yearsBP
                )
                .flatMap((eruption) => {
                    let startEruption = new Date(eruption.ed_stime);
                    const endEruption = eruption.ed_etime ? new Date(eruption.ed_etime) : startEruption;
                    const dates = [];
                    if (startEruption !== endEruption) {
                        dates.push(startEruption.toISOString().substr(0, 7));
                        while (startEruption < endEruption) {
                            startEruption.setMonth(startEruption.getMonth() + 1);
                            dates.push(startEruption.toISOString().substr(0, 7));
                        }
                    }
                    return dates;
                });

            const afesPeriodGeologicalRecord = [];
            const check_afe_geological_record = {};

            afes.forEach((afe) => {
                const startEruption = afe.item.afe_dateBP;
                if (afe.item.volc_num === vol && !check_afe_geological_record[startEruption]) {
                    check_afe_geological_record[startEruption] = true;
                    afesPeriodGeologicalRecord.push(-startEruption);
                }
            });

            const afesPeriodHistoricalRecord = afes
                .filter(
                    (afe) =>
                        afe.item.volc_num === vol &&
                        afe.item.afe_date &&
                        !afe.item.afe_dateBP
                )
                .flatMap((afe) => {
                    const startDate = new Date(afe.item.afe_date);
                    const endDate = afe.item.afe_end_date ? new Date(afe.item.afe_end_date) : startDate;
                    return startDate !== endDate
                        ? generateDateRange(startDate, endDate)
                        : [startDate];
                });

            const newPlotData = [];

            // Set default view based on available historical records
            setSelectedData(
                eruptionsPeriodHistoricalRecord.length === 0 && afesPeriodHistoricalRecord.length === 0
                    ? 'old'
                    : 'new'
            );

            // Generate plot data based on selected data view
            if (selectedData === 'old') {
                newPlotData.push({
                    x: eruptionsPeriodGeologicalRecord,
                    y: Array(eruptionsPeriodGeologicalRecord.length).fill(1),
                    name: 'Geological record',
                    marker: {
                        color: constants.visibilityColors[props.visibilityMode]['Eruption History'],
                        size: 12
                    },
                    type: 'scatter',
                    mode: 'markers',
                    hovertemplate: "<b>Eruption</b><br><br>Date: %{x}<br>"
                });
                newPlotData.push({
                    x: afesPeriodGeologicalRecord,
                    y: Array(afesPeriodGeologicalRecord.length).fill(1),
                    name: 'Samples',
                    marker: {
                        color: constants.visibilityColors[props.visibilityMode]['Samples'],
                        size: 12
                    },
                    type: 'scatter',
                    mode: 'markers',
                    hovertemplate: "<b>Sample</b><br><br>Date: %{x}<br>"
                });
            } else if (selectedData === 'new') {
                newPlotData.push({
                    x: eruptionsPeriodHistoricalRecord.map(date => {
                        const [year, month] = date.split('-').map(Number);
                        return new Date(year, month - 1);
                    }),
                    y: Array(eruptionsPeriodHistoricalRecord.length).fill(1),
                    name: 'Historical record',
                    marker: {
                        color: constants.visibilityColors[props.visibilityMode]['Eruption History'],
                        size: 12
                    },
                    type: 'scatter',
                    mode: 'markers',
                    hovertemplate: "<b>Eruption</b><br><br>Date: %{x}<br>"
                });
                newPlotData.push({
                    x: afesPeriodHistoricalRecord,
                    y: Array(afesPeriodHistoricalRecord.length).fill(1),
                    name: 'Samples',
                    marker: {
                        color: constants.visibilityColors[props.visibilityMode]['Samples'],
                        size: 12
                    },
                    type: 'scatter',
                    mode: 'markers',
                    hovertemplate: "<b>Sample</b><br><br>Date: %{x}<br>"
                });
            }

            setPlotData(newPlotData);
        }
    }, [eruptions, vol, loading, afes, selectedData, isLargeScreen, isMediumScreen, isSmallScreen, isXLScreen, isXSScreen, props]);

    /**
     * generateDateRange: Creates an array of dates between startDate and endDate, incrementing by one year.
     * 
     * @param {Date} startDate - The starting date.
     * @param {Date} endDate - The ending date.
     * @returns {Date[]} - Array of dates.
     */
    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);
        dates.push(new Date(currentDate));
        while (currentDate <= endDate) {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            dates.push(new Date(currentDate));
        }
        return dates;
    };

    /**
     * handleDropdownChange: Handles changes in the data view dropdown.
     * 
     * @param {object} event - The change event from the dropdown.
     */
    const handleDropdownChange = (event) => {
        setSelectedData(event.target.value); // Update the selected data view
    };

    /**
     * showSampling: Handles click events on the plot to show associated samples.
     * 
     * @param {object} event - The click event from the plot.
     */
    const showSampling = (event) => {
        let isYearBP = typeof event.points[0].x === 'number';
        let result;

        if (isYearBP) {
            result = afes.find(obj => -obj.date === event.points[0].x);
        } else {
            const [year, month] = event.points[0].x.split('-');
            result = afes.find(obj => obj.date.toString() === `${year}.${month}`);
        }

        if (result !== undefined) {
            setFlag(true);
            const tag = {value: result.item.afe_code};
            const id = 2;
            props.tagsRef.current.handleSelectChange(tag, id); // Trigger selection change in tagsRef
        }
    };

    // Trigger search when tags are selected
    useEffect(() => {
        if (props.selectedTags && props.selectedTags.length > 0 && flag) {
            props.handleSearch(); // Perform search
            setFlag(false); // Reset flag
        }
    }, [props, flag]);

    if (loading) {
        return (
            <div>
                <RiseLoader
                    cssOverride={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "450px",
                    }}
                    size={10}
                    color={"#123abc"}
                    loading={loading}
                />
            </div>
        );
    }

    return (
        <div>
            <Plot
                data={plotData}
                layout={{
                    title: 'Eruption History',
                    xaxis: {
                        tickfont: {
                            size: 14,
                            color: 'rgb(107, 107, 107)'
                        }
                    },
                    yaxis: {
                        title: 'Event',
                        titlefont: {
                            size: 16,
                            color: 'rgb(107, 107, 107)'
                        },
                        showticklabels: false,
                    },
                    legend: {
                        orientation: 'h',
                        bgcolor: 'rgba(255, 255, 255, 0)',
                        bordercolor: 'rgba(255, 255, 255, 0)'
                    },
                    barmode: 'group',
                    width: width,
                    height: 400,
                }}
                onClick={showSampling}
            />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <select
                    value={selectedData}
                    onChange={handleDropdownChange}
                    style={{ padding: '5px', fontSize: '16px' }}
                >
                    <option value="new">Historical record</option>
                    <option value="old">Geological record</option>
                </select>
            </div>
        </div>
    );
};

export default TimeLine;
