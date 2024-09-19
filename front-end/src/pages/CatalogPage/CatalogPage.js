import { useState, useRef } from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './CatalogPage.styles'

import PopUp from '../PopUp/popUp'
import ParticlePopUp from '../PopUp/ParticlePopUp/ParticlePopUp'
import SearchBar from './SearchBar/SearchBar'
import TagSelector from './TagSelector/TagSelector'
import FilterAndDownloadButtons from './FilterAndDownloadButtons/FilterAndDownloadButtons'
import Results from './Results/Results'

import useSearch from '../../hooks/useSearch'
import useFetchData from '../../hooks/useFetchData'
import useFetchOpinions from '../../hooks/useFetchOpinions'
import { useAuthContext } from '../../hooks/useAuthContext'

/**
 * CatalogPage: Main component for displaying and managing the catalog of particles and volcanoes.
 * 
 * @param {object} props - The component props.
 * @param {string} props.visibilityMode - Mode to control visibility of certain elements.
 * 
 * @returns {JSX.Element} - The rendered CatalogPage component.
 */
function CatalogPage({ visibilityMode }) {
    const classes = useStyles(); // Hook to access styles
    const tagsRef = useRef(null); // Ref to access the TagSelector component
    const { user } = useAuthContext(); // Context for user authentication
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
    const [particlePopUpInfo, setParticlePopUpInfo] = useState(null); // State to store particle info for the popup
    const [displayExperimentalData, setDisplayExperimentalData] = useState(false); // State to toggle experimental data display

    // Custom hooks for fetching data and handling search
    const {
        particles,
        particlesExamples,
        volcanoes,
        eruptions,
        AFE,
        tags,
        isLoading: dataLoading
    } = useFetchData(displayExperimentalData);

    const {
        searchTerm,
        setSearchTerm,
        searchSubmit,
        setSearchSubmit,
        filterSubmit,
        setFilterSubmit,
        searchData,
        suggestSearch,
        suggest,
        selectedTags,
        setSelectedTags,
        isLoading,
        handleSubmit,
        getSearchResult
    } = useSearch(particles, volcanoes);

    const { fetchOpinions, result } = useFetchOpinions();

    /**
     * Handle double-click on a result item to open the particle popup.
     * 
     * @param {object} info - The information of the particle to be displayed in the popup.
     */
    const handleDoubleClick = (info) => {
        setParticlePopUpInfo(info);
        setIsPopupOpen(true);
    }

    return (
        <div className={classes.SearchContainer}>
            {/* Title of the search section */}
            <Typography className={classes.SearchTitle}>Explore the Database</Typography>

            {/* Search bar component */}
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                volcanoes={volcanoes}
                handleSubmit={handleSubmit} 
                displayExperimentalData={displayExperimentalData}
                setDisplayExperimentalData={setDisplayExperimentalData} 
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                tagsRef={tagsRef}
            />

            {/* Tag selector component */}
            <TagSelector 
                selectedTags={selectedTags} 
                setSelectedTags={setSelectedTags} 
                tagsRef={tagsRef} 
                volcanoes={volcanoes}
                values_tags={tags}
            />

            {/* Filter and download buttons */}
            <FilterAndDownloadButtons
                filterSubmit={filterSubmit}
                searchTerm={searchTerm} 
                handleSubmit={handleSubmit} 
                searchData={searchData}
                isLoading={isLoading || dataLoading}
                user={user}
            />

            {/* Results component showing the search results */}
            <Results
                isLoading={isLoading || dataLoading}
                searchData={searchData}
                filterSubmit={filterSubmit}
                visibilityMode={visibilityMode}
                handleDoubleClick={handleDoubleClick}
                tagsRef={tagsRef}
                selectedTags={selectedTags}
                handleSubmit={handleSubmit}
                searchTerm={searchTerm}
                result={result}
                eruptions={eruptions}
                AFE={AFE}
                volcanoes={volcanoes}
                particles={particles}
                particlesExamples={particlesExamples}
                suggest={suggest}
                searchSubmit={searchSubmit}
                suggestSearch={suggestSearch}
                setSearchTerm={setSearchTerm}
                setSearchSubmit={setSearchSubmit}
                setFilterSubmit={setFilterSubmit}
                getSearchResult={getSearchResult}
            />

            {/* Conditional rendering of the popup component */}
            {isPopupOpen &&
                <PopUp onClose={() => setIsPopupOpen(false)}>
                    <ParticlePopUp 
                        result={result} 
                        visibilityMode={visibilityMode} 
                        info={particlePopUpInfo} 
                        refetchOpinions={fetchOpinions} 
                        onClose={() => setIsPopupOpen(false)}
                    />
                </PopUp>
            }
        </div>
    )
}

export default CatalogPage
