import { loadingStyle } from "./loadingCard.style";

/**
 * LoadingCard: A component that displays a loading placeholder with a poster and name box.
 * Utilizes styles from `loadingStyle` to provide a skeleton loader.
 * 
 * @returns {JSX.Element} The LoadingCard component.
 */
function LoadingCard() {
    // Use custom styles from `loadingStyle`
    const classes = loadingStyle();

    return (
        <div className={classes.loadingContainer}>
            {/* Placeholder for the poster image */}
            <div className={classes.loadingPoster}></div>

            {/* Container for the name or title */}
            <div className={classes.nameBox}>
                {/* Placeholder for the name text */}
                <div className={classes.loadingName}></div>
            </div>
        </div>
    );
}

export default LoadingCard;
