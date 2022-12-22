import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/EditProfile.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function editProfile(){

    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState({

    });
    const [isFemale, setGender] = useState(false);

   useEffect(() => {

        if(!router.isReady){
            return
        }
        else{
            //Get userData from api

            fetch(`/api/profile/${id}/`, {
                method:'GET',
                headers: {
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    //Update userData
                    setUserData((prevState) => ({
                        ...prevState,
                        first_name:data.user.first_name, 
                        last_name:data.user.last_name,
                        profile_pic: data.user.profile_pic,
                        gender:data.user.gender,
                        country:data.user.country,
                        education:data.user.education,
                        city:data.user.city,
                        dob:data.user.dob,
                        marital:data.user.marital,
                    })
                    )
                if(data.user.gender == "Female"){
                    setGender(true)
                }
                })
               
        }
   
    }, [router.isReady])

    //After form was submitted the function will send data to Server

    const updateProfile = (e) => {
        e.preventDefault();
        console.log(e.target.profile_pic.value);
        const updatedUser = {
                first_name: e.target.first_name.value != "" ? e.target.first_name.value : userData.first_name, 
                last_name: e.target.last_name.value != "" ? e.target.last_name.value : userData.last_name ,
                profile_pic: e.target.profile_pic.value != undefined ? e.target.profile_pic.value :  data.user.profile_pic,
                country:e.target.country.value != ""? e.target.country.value : userData.country,
                gender:e.target.gender.value != "" ? e.target.gender.value : userData.gender,
                education:e.target.education.value  != "" ? e.target.education.value : userData.education,
                city:e.target.city.value  != "" ? e.target.city.value : userData.city,
                dob:e.target.dob.value  != "" ? e.target.dob.value : userData.dob,
                marital_status:e.target.marital.value  != "" ? e.target.marital.value : userData.marital, 
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

    //Change picture's state of source 

    const DisplaySelectedPicture = (e) => {
        e.preventDefault();
        setUserData((prevState) => ({
            ...prevState,
            profile_pic: URL.createObjectURL(e.target.files[0]), 
        }))
    }

    return (
        <div className={styles.editProfileContainer}>
        <Header></Header>
        <h1>Edit profile</h1>
            <form onSubmit={updateProfile}>
                <img src ={userData.profile_pic != undefined? userData.profile_pic : '/images/noImg.png'} alt='profile Picture' id ={styles.user_pic}></img>

                <label htmlFor="profile_picInput" id = {styles.UpdatePictureLabel}>Update Picture
                    <input type="file" id="profile_picInput" name="profile_pic" accept="image/*" multiple onChange={DisplaySelectedPicture}></input>
                </label>
               

                <label htmlFor="first_name">First Name</label>
                <input type="text" placeholder={userData.first_name} name = "first_name" id = "first_name"></input>

                <label htmlFor="last_name">Last Name</label>
                <input type="text" placeholder={userData.last_name} name = {userData.last_name} id = "last_name"></input>

                <div className = {styles.GenderContainer}>
                    <p>Gender</p>
                    
                    <label htmlFor="male">Male</label>
                    <input type="radio" name = "gender" value='Male' id = "male"  checked={userData.gender === "Male"} onChange = {(e)=> {setUserData((p) => ({...p, gender:'Male'}))}}/>

                    <label htmlFor="female">Female</label>
                    <input type="radio" name = "gender" value='Female' id = "female" checked={userData.gender === "Female"} onChange = {(e)=> {setUserData((p) => ({...p, gender:'Female'}))}}/>
                </div>
               
                <label htmlFor="birthday" id={styles.bodLabel}>Birthday</label>
                <input type="date" name = "dob" id = "birthday" placeholder={userData.dob}></input>
        
                <label htmlFor="Marital_Status">Marital Status</label>
                <select id = "Marital_Status" name = "marital">
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Active Search">Active Search</option>
                </select>

                <label htmlFor="country">Country
                <input type="text" placeholder = {userData.country} name = "country"  id = "country"></input>
                </label>
                
                <label htmlFor="city">City</label>
                <input type="text"  name = "city"  id = "city" placeholder={userData.city} ></input>

                <label htmlFor="education">Education
                <input type="text"  name = "education"  id = "education"  placeholder={userData.education}></input>
                </label>

                <input type="submit" value="Save" ></input>
            </form>
            <Footer></Footer>
        </div>
    )

}