import { useRouter } from 'next/router'; // tp get access to parameter in url
import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "../../styles/Profile.module.css";

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
        <Footer></Footer>
    </div>;
}

export default Profile;

