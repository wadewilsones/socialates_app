import { useRouter } from 'next/router'; // tp get access to parameter in url
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "../../styles/Profile.module.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;
    return <div className={styles.container}>
        <Header></Header>
            <section className={styles.UserMainInfo}>
                <img src = "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg"></img>
                <div id = {styles.status}>
                    <svg viewBox="-6 -2 23 20" xmlns="http://www.w3.org/2000/svg" >
                        <circle cx="10" cy="11" r="3"/>
                    </svg>
                    <p>Online</p>
                </div>
                <h3>Christine Warner</h3>
                <h6>Some meaningful status</h6>
            </section>

            <section className={styles.ContactInfo}>
            <h3>Contact Info</h3>
                <ul>
                    <li><ApartmentIcon className = {styles.contactIcons}></ApartmentIcon><span>City: Greensboro</span></li>
                    <li><SchoolIcon  className = {styles.contactIcons}></SchoolIcon><span>Education: High School of Greensboro</span></li>
                </ul>
                
                <a><InfoIcon id = {styles.contactIconsInfo}></InfoIcon><span>Show more information</span></a>
            </section>

            <section  className={styles.Photos}>
                <h3>Photos <span>120</span></h3>
                <div>
                    <img src='https://cdn.pixabay.com/photo/2022/10/01/22/38/sugarloaf-rock-7492389_960_720.jpg'></img>
                    <img src='https://cdn.pixabay.com/photo/2022/10/09/04/28/deer-7508187_960_720.jpg'></img>
                    <img src='https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg'></img>
                </div>
            </section>

            <section className={styles.CreatePost}>
            <h3>Create a Post</h3>
                <div>
                    <input type="text" placeholder="Got something to say?"></input>
                    <label for ="uploadImage">
                        <input type="file" id='uploadImage' hidden/>
                        <img src='/images/uploadPic.svg' />
                    </label>
                </div>

            </section>
   
    </div>;
}

export default Profile;

