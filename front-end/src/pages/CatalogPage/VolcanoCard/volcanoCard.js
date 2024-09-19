import { volcanoStyle } from "./volcanoCard.style"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import * as constants from '../../../Constants'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useGetAnnotationDistribution } from '../../../hooks/useGetAnnotationDistribution'; // Import the hook
import { useState, useEffect, useRef } from 'react'
import ParticleInformation from '../../ParticleInformation/ParticleInformation'

/**
 * VolcanoCard Component: Displays information and images of a volcano.
 * Handles user interactions and dynamic content loading.
 * 
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} - The rendered VolcanoCard component.
 */
export default function VolcanoCard(props) {
    // Constants and styles
    const proxy = constants.PROXY
    const classes = volcanoStyle();
    
    // State variables
    const [flag, setFlag] = useState(null); // Flag to control search action
    const [hasOpinion, setHasOpinion] = useState(false); // Indicates if the user has an opinion
    const { user } = useAuthContext(); // User context for authentication info
    const [userRole, setUserRole] = useState('user'); // User role state
    const { getAnnotationDistribution, result } = useGetAnnotationDistribution(); // Hook for fetching annotation distribution
    const fetchOpinionsRef = useRef(); // Ref for the fetch opinions function

    // Ref to update fetchOpinions function
    fetchOpinionsRef.current = async () => {
        try {
            await getAnnotationDistribution(props.info._id);
        } catch (error) {
            console.error('Error fetching opinions:', error);
        }
    }

    /**
     * Handles image load event.
     * Fetches opinions if the user is a team member.
     */
    const handleImageLoad = () => {
        if (userRole === 'team member') {
            fetchOpinionsRef.current(); 
        }
    }

    // Effect to update user role and opinion state
    useEffect(() => {
        if (user) {
            setUserRole(JSON.parse(atob(user.token.split('.')[1])).role);
            setHasOpinion(props.opinionResult.success && props.opinionResult.opinions.some(
                (opinion) => opinion.particleId === props.info._id
            ));
        } else {
            setHasOpinion(false);
        }
    }, [user, props]);

    /**
     * Handles click event on the image.
     * Updates selected tags and triggers search if necessary.
     */
    const handleOnClick = () => {
        if (props.tagsRef) {
            setFlag(1);
            props.tagsRef.current.handleSelectChange({ value: props.info.volc_name }, 1);
        }
    }

    // Effect to trigger search when flags and selected tags are updated
    useEffect(() => {
        if (props.selectedTags && props.selectedTags.length > 0 && flag) {
            props.handleSearch();
            setFlag(null);
        }
    }, [props, flag]);

    return (
        <div className={`${classes.container} ${props.hasAllParticlesOpinion ? classes.hasOpinion : ''} ${hasOpinion ? classes.hasOpinion : ''}`} >
            {props.type === "volcanoes" ? 
                <div>     
                    <img
                        alt=""
                        style={props.tagsRef ? { width: "100%", height: "200px", cursor: "pointer" } : { width: "100%", height: "200px" }}
                        className={classes.poster}
                        src={`${proxy}/${props.imgURL}`}
                        onClick={() => handleOnClick()}
                        onLoad={handleImageLoad}
                    />
                    <div className={classes.name}>{props.info.volc_name}</div>
                </div>
            :
                <div onDoubleClick={props.onDoubleClick}>
                    <LazyLoadImage
                        style={{ width: "100%", height: "200px" }}
                        className={classes.poster}
                        src={`${proxy}/${props.imgURL}`}
                        threshold="500"
                        afterLoad={handleImageLoad}
                    />
                    <div className={classes.cardOver}>
                        <ParticleInformation 
                            info={props.info}
                            userRole={userRole}
                            result={result}
                            visibilityMode={props.visibilityMode}
                            size={160}
                            bgcolor={"#C0C0C0"}
                        />
                    </div>
                </div>
            }
        </div>
    )
}
