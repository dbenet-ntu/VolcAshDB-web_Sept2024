import { AboutUsStyle } from './AboutUs.styles';
import { Link } from 'react-router-dom';
import useFetchTotalParticles from '../../hooks/useFetchTotalParticles';

/**
 * AboutUs Component: Provides information about the VolcAshDB project, including
 * details about the dataset, publications, contributors, and contact information.
 * 
 * @returns {JSX.Element} - The rendered AboutUs component.
 */
const AboutUs = () => {
    // Styles for the AboutUs component
    const classes = AboutUsStyle();

    // Fetch total number of particles from the custom hook
    const { totalParticles } = useFetchTotalParticles();

    return (
        <div className={classes.AboutUsContainer}>
            {/* Main heading for the page */}
            <h1>About VolcAshDB</h1>
            
            {/* Paragraph describing the purpose and features of VolcAshDB */}
            <p>        
                We created the Volcanic Ash DataBase (VolcAshDB) to advance towards a more standardized approach in volcanic ash particle classification. The database hosts over {totalParticles} high-resolution images of ash particles from diverse magma compositions and eruptive styles. Each particle has been classified into one of four groups: altered material, free crystal, juvenile and lithic. In addition, particles have been individually characterized through the extraction of features sensitive to the particle shape, texture, and color. VolcAshDB allows free access for users to filter and browse through ash particle images, visualize the particle features' distributions, and download images along with their feature values and metadata. This platform can be useful for comparative studies and offers a dataset suitable for training Machine Learning models to automatically classify ash particles.
            </p>
            
            {/* Paragraph with dataset version and publication link */}
            <p style={{fontSize: '12px'}}>
                Version 0.1 of Dataset published 2024 in Centre de données de l'Institut de Physique du Globe de Paris
                <a style={{paddingLeft: '5px'}} href="https://doi.org/10.18715/ipgp.2024.lx32oxw9" target="_blank" rel="noopener noreferrer">
                    https://doi.org/10.18715/ipgp.2024.lx32oxw9
                </a>
            </p>

            {/* Section for latest publications */}
            <h2>Latest Publications</h2>
            <p>
                Benet, D., Costa, F., Widiwijayanti, C., 2024. Volcanic ash classification through Machine Learning. Geochemistry, Geophysics, Geosystems.
                <br/>
                <a href="https://doi.org/10.1029/2023GC011224" target="_blank" rel="noopener noreferrer">
                    https://doi.org/10.1029/2023GC011224
                </a>
            </p>

            <p>
                Benet, D., Costa, F., Widiwijayanti, C., Pallister, J., Pedreros, G., Allard, P., Humaida, H., Aoki, Y. and Maeno, F., 2024. VolcAshDB: a Volcanic Ash DataBase of classified particle images and features. Bulletin of Volcanology, 86(1), pp.1-30.
                <br/>
                <a href="https://doi.org/10.1007/s00445-023-01695-4" target="_blank" rel="noopener noreferrer">
                    https://doi.org/10.1007/s00445-023-01695-4
                </a>
            </p>

            {/* Section for listing contributors */}
            <h2>Contributors</h2>
            <strong>VolcAshDB Team</strong>
            <ul style={{listStyleType:"none"}}>
                <strong>Project Principal Investigator</strong>
                <ul style={{listStyleType:"none"}}>
                    <li>Fidel Costa</li>
                </ul>     
                <strong>Coordinators</strong>
                <ul style={{listStyleType:"none"}}>
                    <li>Damià Benet</li>
                    <li>Kévin Migadel</li>
                </ul>  
                <strong>Web developer</strong>
                <ul style={{listStyleType:"none"}}>
                    <li>Kévin Migadel</li>
                </ul>   
                <strong>Data analyst</strong>
                <ul style={{listStyleType:"none"}}>
                    <li>Damià Benet</li>
                </ul>           
            </ul>

            <strong>Computer services support by SMV</strong>
            <ul style={{listStyleType:"none"}}>
                <li>David Waissenbach</li>
                <li>Michel Le Cocq</li>
            </ul>

            <strong>Previous developers</strong>
            <ul style={{listStyleType:"none"}}>
                <li>Charles Tran</li>
                <li>Khai Truong</li>
            </ul>

            <strong>Contributors</strong>
            <ul style={{listStyleType:"none"}}>
                <li>John Pallister</li>
                <li>Gabriela Pedredos</li>
                <li>Patrick Allard</li>
                <li>Hanik Humaida</li>
                <li>Yosuke Aoki</li>
                <li>Fukashi Maeno</li>
                <li>Daniel W. J. Lee</li>
                <li>Claudia D'Oriano</li>
                <li>Massimo Pompilio</li>
                <li>Dini Nurfiani</li>
                <li>Hamdi Rifai</li>
                <li>Florian Dugauquier</li>
            </ul>

            {/* Section for contact information */}
            <h2>Contact Us</h2>
            <p>
                If you have any questions or would like to get in touch, contact us at:&nbsp;  
                <a href="mailto:volcashdb@ipgp.fr">volcashdb@ipgp.fr</a>
            </p>

            {/* Footer with links to legal information, privacy policy, and license */}
            <div className={classes.footer}>
                <Link to='/legal' className={classes.legalInformation}>
                    Legal information
                </Link>
                <Link to='/legal' className={classes.legalInformation}>
                    Privacy policy / Data protection
                </Link>
                <Link to='/legal'>
                    License
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;
