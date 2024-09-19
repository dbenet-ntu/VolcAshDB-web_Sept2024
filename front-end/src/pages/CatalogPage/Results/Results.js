import React from "react";
import { Typography } from '@material-ui/core';
import LoadingCard from '../LoadingCard/loadingCard';
import VolcanoCard from '../VolcanoCard/volcanoCard';
import VolcanoTimeLine from '../../VolcanoDetailPage/VolcanoeTimeLine';
import { ResultsStyles } from './Results.styles';

/**
 * Results: Component to display search results for volcanoes and particles.
 * 
 * @param {object} props - Component props.
 * @returns {JSX.Element} The rendered component.
 */
const Results = ({
    isLoading,
    searchData,
    filterSubmit,
    visibilityMode,
    handleDoubleClick,
    tagsRef,
    selectedTags,
    handleSubmit,
    searchTerm,
    result,
    eruptions,
    AFE,
    volcanoes,
    particles,
    particlesExamples,
    suggest,
    searchSubmit,
    suggestSearch,
    setSearchTerm,
    setSearchSubmit,
    setFilterSubmit,
    getSearchResult
}) => {
    const classes = ResultsStyles();

    /**
     * Renders the loading state with placeholder cards.
     * @returns {JSX.Element} Loading state component.
     */
    const renderLoading = () => (
        <div>
            <h2 className={classes.title}>VOLCANO</h2>
            <div className={classes.loadingContainer}>
                <LoadingCard />
            </div>

            <hr className={classes.separator} />

            <h2 className={classes.title}>PARTICLE</h2>
            {renderInformation()}
            <div className={classes.loadingContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                    <LoadingCard key={index + 1} />
                ))}
            </div>
        </div>
    );

    /**
     * Renders the number of search results found.
     * @param {Array} particles - Array of particle results.
     * @returns {JSX.Element} Component displaying the number of results.
     */
    const renderResultsFound = (particles) => (
        <Typography component='h3' variant='h5' align='center' className={classes.noResults}>
            {particles.length} search results for "{filterSubmit}":
        </Typography>
    );

    /**
     * Renders a message when no results are found.
     * @returns {JSX.Element} Component displaying a no results message.
     */
    const renderNoResults = () => (
        <Typography component="h3" variant="h5" align="center" className={classes.noResults}>
            Sorry! There is no result for "{filterSubmit}" in our database.
        </Typography>
    );

    /**
     * Renders a suggestion for alternative search terms.
     * @returns {JSX.Element} Component displaying a suggestion for search.
     */
    const renderSuggestSearch = () => (
        <Typography component="h3" variant="h5" align="center" className={classes.noResults}>
            Sorry! There is no result for "{searchSubmit}" in our database.
            <br />
            Did you mean{' '}
            <span
                className={classes.suggestLink}
                onClick={() => {
                    getSearchResult(suggestSearch.toLowerCase(), selectedTags);
                    setSearchTerm(suggestSearch);
                    setSearchSubmit(suggestSearch);
                    setFilterSubmit(
                        suggestSearch && selectedTags.length !== 0
                        ? suggestSearch + ', ' + selectedTags.join(',')
                        : suggestSearch + selectedTags.join(',')
                    );
                }}
            >
                {suggestSearch}
            </span>
            ?
        </Typography>
    );

    /**
     * Renders the search result message based on available data.
     * @returns {JSX.Element} Component displaying search results or messages.
     */
    const renderSearch = () => (
        <Typography style={{ marginLeft: 25, paddingBottom: 20 }}>
            {
                (searchData.volcanoes && searchData.volcanoes.length !== 0) || (searchData.particles && searchData.particles.length !== 0) ? 
                    renderResultsFound(searchData.particles)
                : suggest ? 
                    renderSuggestSearch() : renderNoResults()
            }
        </Typography>
    );

    /**
     * Renders the information section with instructions.
     * @returns {JSX.Element} Component displaying instructions.
     */
    const renderInformation = () => (
        <div>
            <Typography align='center' style={{ marginBottom: 10, color: '#C8102B', fontSize: '12px' }}>
                Double-click on the particle images for more information!
            </Typography>
            <hr className={classes.separatorSearchBar}/>
        </div>
    );

    /**
     * Checks if a volcano has opinions on all its particles.
     * @param {object} volcano - The volcano object to check.
     * @returns {boolean} True if all particles have opinions, otherwise false.
     */
    const checkVolcanoHasAllParticlesOpinion = (volcano) => {
        let check = false;

        if (result.success && particles.length > 0) {
            const particles_volc = particles.filter(p => p.volc_num === volcano.volc_num);
            check = particles_volc.every(p => result.opinions.some(o => o.particleId === p._id));
        }
    
        return check;
    };

    /**
     * Renders the list of volcanoes.
     * @param {Array} volcanoes - Array of volcano data.
     * @param {boolean} isHomePage - Flag indicating if the component is on the home page.
     * @returns {JSX.Element} Component displaying volcano cards.
     */
    const renderVolcanoes = (volcanoes, isHomePage) => (
        <div>
            <div className={classes.ResultVolcano}>
                <div>
                    <h2 className={classes.title}>VOLCANO</h2>
                    <div className={classes.resultContainer}>
                        {volcanoes.map((ele, index) => (
                            <VolcanoCard
                                key={index}
                                visibilityMode={visibilityMode}
                                onDoubleClick={() => handleDoubleClick(ele)}
                                tagsRef={tagsRef}
                                selectedTags={selectedTags}
                                handleSearch={() => handleSubmit(searchTerm)}
                                info={ele}
                                imgURL={"images/volcanoes/" + ele.imgURL}
                                type="volcanoes"
                                opinionResult={result}
                                hasAllParticlesOpinion={checkVolcanoHasAllParticlesOpinion(ele)}
                            />
                        ))}
                    </div>
                </div>
                {!isHomePage && (
                    <div className={classes.VolcanoTimeLine}>
                        <VolcanoTimeLine 
                            visibilityMode={visibilityMode} 
                            onGetEruptions={eruptions} 
                            onGetAFE={AFE} 
                            onGetVolcano={() => volcanoes} 
                            tagsRef={tagsRef} 
                            handleSearch={() => handleSubmit(searchTerm)} 
                            selectedTags={selectedTags}
                        />
                    </div>
                )}
            </div>
            <hr className={classes.separator} />
        </div>
    );

    /**
     * Renders the list of particles.
     * @param {Array} particles - Array of particle data.
     * @returns {JSX.Element} Component displaying particle cards.
     */
    const renderParticles = (particles) => (
        <div>
            <h2 className={classes.title}>PARTICLE</h2>
            {renderInformation()}
            <div className={classes.resultContainer}>
                {particles.map((ele, index) => (
                    <VolcanoCard
                        key={index}
                        visibilityMode={visibilityMode}
                        onDoubleClick={() => handleDoubleClick(ele)}
                        info={ele}
                        imgURL={"images/particles/" + ele.imgURL}
                        type="particles"
                        opinionResult={result}
                    />
                ))}
            </div>
        </div>
    );

    /**
     * Renders the results based on available volcanoes and particles data.
     * @returns {JSX.Element} Component displaying the results.
     */
    const renderResults = () => {
        const volcanoes = searchData.volcanoes;
        const particles = searchData.particles;
    
        return (
            <div>
                {volcanoes && volcanoes.length > 0 ? renderVolcanoes(volcanoes, false) : null}
                {particles && particles.length > 0 ? renderParticles(particles) : null}
            </div>
        );
    };

    return (
        <div className={classes.ResultContainer}>
            {
                isLoading ? (
                    <div>
                        {renderLoading()}
                    </div>
                ) : filterSubmit.length !== 0 ? (
                    <div>
                        {renderSearch()}
                        {renderResults()}
                    </div>
                ) : (
                    <div>
                        {renderVolcanoes(volcanoes, true)}
                        {renderParticles(particlesExamples)}
                    </div>
                )
            }
        </div>
    );
};

export default Results;
