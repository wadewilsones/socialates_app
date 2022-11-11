import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/EditProfile.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function editProfile(){

    const router = useRouter();
    const { id } = router.query;

    const [userData, setUserData] = useState({
        first_name: "", 
        last_name:"",
        profile_pic: "",
        gender:"",
        country:"",
        education:"",
        city:"",
        dob:"",
    })

    useEffect(() => {

        if(!router.isReady){
            return
        }
        else{
            setUserData((prevState) => ({
                ...prevState,
                first_name: router.query.first_name, 
                last_name:router.query.last_name,
                profile_pic: "",
                gender:router.query.gender,
                country:router.query.country,
                education:router.query.education,
                city:router.query.city,
                dob:router.query.dob,
                marital:router.query.marital,

            }))
        }
    }, [router.isReady])


    const updateProfile = (e) => {
        e.preventDefault();
        const updatedUser = {
                first_name: e.target.first_name.value, 
                last_name:e.target.last_name.value,
                //profile_pic: "",
                country:e.target.country.value,
                gender:e.target.gender.value,
                education:e.target.education.value,
                city:e.target.city.value,
                dob:e.target.dob.value,
                marital:e.target.marital.value,
        }
        setUserData((prevState) => ({
            ...prevState,
             updatedUser
        }))
        
        //Validate data code...
        // Send to DB
        fetch(`/api/profile/${id}/updateProfile`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                userData:updatedUser
            })
        })
            .then(res => res.json())
            .then(data => 
            {
                router.push(`/profile/${id}`)
            })
       
    }
    return (
        <div className={styles.editProfileContainer}>
        <Header></Header>
        <h1>Edit profile</h1>
            <form onSubmit={updateProfile}>
                <img src ="https://cdn.pixabay.com/photo/2022/10/31/10/18/red-deer-7559423_960_720.jpg" alt='profile Picture' id ={styles.user_pic}></img>

                <label htmlFor="profile_picInput" id = {styles.UpdatePictureLabel}>Update Picture
                    <input type="file" id="profile_picInput" name="profile_pic"></input>
                </label>
               

                <label htmlFor="first_name">First Name</label>
                <input type="text" placeholder={userData.first_name} name = "first_name" id = "first_name"></input>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" placeholder="Haranina" name = {userData.last_name}  id = "last_name"></input>

                <div className = {styles.GenderContainer}>
                    <p>Gender</p>
                    
                    <label htmlFor="male">Male</label>
                    <input type="radio" name = "gender" value='Male' id = "male" {...userData.gender == 'male'? defaultChecked : ""}></input>

                    <label htmlFor="female">Female</label>
                    <input type="radio" name = "gender" value='Female' id = "female" {...userData.gender == 'female'? defaultChecked : ""}></input>
                </div>
               
                <label htmlFor="birthday" id={styles.bodLabel}>Birthday</label>
                <input type="date" name = "dob" id = "birthday" {...userData.dob != ""? value = userData.dob : ""}></input>
        
                <label htmlFor="Marital_Status">Marital Status</label>
                <select id = "Marital_Status" value = {userData.marital != ""? userData.marital : ""} name = "marital">
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Active Search">Active Search</option>
                </select>

                <label htmlFor="country">Country</label>
                <input type="text"  placeholder = {userData.country} name = "country"  id = "country"></input>
                
                <label htmlFor="city">City</label>
                <input type="text"  name = "city"  id = "city" placeholder={userData.city} ></input>

                <label htmlFor="education">Education</label>
                <input type="text"  name = "education"  id = "education"  placeholder={userData.education} ></input>

                <input type="submit" value="Save"></input>
            </form>
            <Footer></Footer>
        </div>
    )

}