import { InformationPopUpStyle } from './InformationPopUp.style';
import table1 from '../../../assets/images/table1.png';
import table2 from '../../../assets/images/table2.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**
 * InformationPopUp Component:
 * Displays a pop-up containing images of tables with lazy-loading functionality.
 * Utilizes Material-UI for styling and `react-lazy-load-image-component` for performance optimization.
 * 
 * @returns {JSX.Element} The rendered component displaying the two images.
 */
const InformationPopUp = () => {
    // Initialize custom styles using the `InformationPopUpStyle` hook.
    const classes = InformationPopUpStyle();

    return (
        <div className={classes.InformationPopUp}>
            {/* Lazy load the first image (table1.png) with a threshold of 500px for loading */}
            <LazyLoadImage
                className={classes.Image}
                src={table1}
                threshold="500"
            />

            {/* Lazy load the second image (table2.png) with a threshold of 500px for loading */}
            <LazyLoadImage
                className={classes.Image}
                src={table2}
                threshold="500"
            />
        </div>
    );
};

export default InformationPopUp;
