import { VolcanoeTimeLineStyle } from './VolcanoeTimeLine.styles';
import TimeLine from './Timeline';

/**
 * VolcanoTimeLine: A component that wraps the TimeLine component with volcano-specific data.
 * 
 * @param {object} props - Properties passed to the component.
 * @param {function} props.onGetEruptions - Function to retrieve eruption data.
 * @param {function} props.onGetVolcano - Function to retrieve volcano data.
 * @param {function} props.onGetAFE - Function to retrieve AFE (Ash Fall Events) data.
 * @param {object} props.visibilityMode - Object controlling visibility settings.
 * @param {function} props.handleSearch - Function to handle search actions.
 * @param {array} props.selectedTags - Array of selected tags.
 * @param {object} props.tagsRef - Ref to tag selection component.
 * @returns {JSX.Element} - The rendered component.
 */
const VolcanoTimeLine = (props) => {
    // Destructure props for easier access
    const eruptions = props.onGetEruptions;
    const volcanoes = props.onGetVolcano();
    const AFE = props.onGetAFE;
    const classes = VolcanoeTimeLineStyle(); // Custom styles for the component
    const volc = props.onGetVolcano()[0].volc_name; // Get the name of the volcano from the first item

    // Determine the volcano number based on the volcano name
    let volc_num = 0;
    for (let i = 0; i < volcanoes.length; i++) {
        if (volcanoes[i].volc_name === volc) {
            volc_num = volcanoes[i].volc_num;
            break; // Exit loop once the volcano number is found
        }
    }

    // Prepare dummy data for AFEs based on volcano number
    let AFEDummyData = [];
    for (let i = 0; i < AFE.length; i++) {
        if (AFE[i]['volc_num'] === volc_num) {
            if (AFE[i]['afe_dateBP']) {
                AFEDummyData.push({ date: AFE[i]['afe_dateBP'], item: AFE[i] });
            } else if (AFE[i]['afe_date'] && !AFE[i]['afe_dateBP']) {
                // Format date if afe_dateBP is not available
                let s = AFE[i]['afe_date'].substr(0, 4) + '.' + AFE[i]['afe_date'].substr(5, 7);
                AFEDummyData.push({ date: parseFloat(s), item: AFE[i] });
            }
        }
    }

    return (
        <div className={classes.TimeLineOverlay}>  
            <TimeLine 
                visibilityMode={props.visibilityMode} // Pass visibility mode to TimeLine
                onPassVolcName={() => volc_num} // Provide volcano number to TimeLine
                onEruptions={() => eruptions} // Provide eruption data to TimeLine
                onAFES={() => AFEDummyData} // Provide AFE data to TimeLine
                tagsRef={props.tagsRef} // Reference for tag selection
                handleSearch={props.handleSearch} // Function to handle search actions
                selectedTags={props.selectedTags} // Array of selected tags
            /> 
        </div>
    );
};

export default VolcanoTimeLine;
