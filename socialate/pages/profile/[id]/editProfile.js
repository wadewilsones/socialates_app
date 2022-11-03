import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/EditProfile.module.css"

export default function editProfile(){
    return (
        <div className={styles.editProfileContainer}>
        <Header></Header>
        <h1>Edit profile</h1>
            <form>
                <img src ="https://cdn.pixabay.com/photo/2022/10/31/10/18/red-deer-7559423_960_720.jpg" alt='profile Picture' id ={styles.user_pic}></img>

                <label htmlFor="profile_picInput" id = {styles.UpdatePictureLabel}>Update Picture
                    <input type="file" id="profile_picInput" name="profile_pic"></input>
                </label>
               

                <label htmlFor="first_name">First Name</label>
                <input type="text" placeholder="Ulada" name = "first_name" id = "first_name"></input>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" placeholder="Haranina" name = "last_name"  id = "last_name"></input>

                <div className = {styles.GenderContainer}>
                    <p>Gender</p>
                    <label htmlFor="male">Male</label>
                    <input type="radio" name = "gender" value='Male' id = "male"></input>

                    <label htmlFor="female">Female</label>
                    <input type="radio" name = "gender" value='Female' id = "female"></input>
                </div>
               

                <label htmlFor="birthday" id={styles.bodLabel}>Birthday</label>
                <input type="date" name = "dob" id = "birthday"></input>
                
                <label htmlFor="Marital_Status">Marital Status</label>
                <select id = "Marital_Status">
                    <option>Married</option>
                    <option>Single</option>
                    <option>Active Search</option>
                </select>

                <label htmlFor="country">Country</label>
                <input type="text"  name = "country"  id = "country"></input>
                
                <label htmlFor="city">City</label>
                <input type="text"  name = "city"  id = "city"></input>

                <label htmlFor="education">Education</label>
                <input type="text"  name = "education"  id = "education"></input>

                <label htmlFor="birthday">Birthday</label>
                <input type="date" name = "dob" id = "birthday"></input>

                <input type="submit" value="Save"></input>
            </form>
            <Footer></Footer>
        </div>
    )

}