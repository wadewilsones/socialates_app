import { useRouter } from 'next/router'; // tp get access to parameter in url
import Footer from "../../components/footer";
import { useEffect, useState } from 'react';
import Header from "../../components/header";
import styles from "../../styles/Profile.module.css";
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';



const Profile = () => {

    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState({
        first_name: "", 
        last_name:"",
        profile_pic: "",
        status:"Some meaningful status",
        country:"",
        education:"",
        city:"",
        dob:"",
        marital_status:"",
        is_Online:'False',
        friends:""
    });

    useEffect(() => {
        if(!router.isReady){
            return
        }
        else{
            fetch(`/api/profile/${id}`, {
                method:'GET'
            })
            .then(res => res.json())
            .then((data) => {
                const updatedUserData = {
                    first_name: data.user.first_name, 
                    last_name:data.user.last_name,
                    profile_pic: data.user.profile_pic,
                    status:data.user.status,
                    country:data.user.country,
                    education:data.user.education,
                    city:data.user.city,
                    dob:data.user.dob,
                    marital_status:data.user.marital,
                    is_Online:'True',
                    is_userProfile:'True',
                    friends:data.user.friends
                }
                setUser(() => ({
                    ...updatedUserData
                }))
            })
        }

    }, [router.isReady])

    //Handle status change

    const HandleStatus = (e) => {
        if(e.key == 'Enter'){
            console.log(e.target.value)
            //Add new Status and update State
            setUser((user) => ({
                ...user,
                status:e.target.value
            }))
            fetch(`/api/profile/${id}/changeStatus`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    status:e.target.value
                })
            })
        }
    }
 

    return <div className={styles.container}>
        <Header></Header>
            <section className={styles.UserMainInfo}>
                <img src = {user.profile_pic ? user.profile_pic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}></img>
                <div id = {styles.status}>
                    <svg viewBox="-6 -2 23 20" xmlns="http://www.w3.org/2000/svg" >
                        <circle cx="10" cy="11" r="3"/>
                    </svg>
                    <p>{user.is_Online == "False"? "Offline" : "Online"}</p>
                </div>
                <h3>{user.first_name} {user.last_name}</h3>
                <input type="text" placeholder={user.status ? user.status : "Type your status here..."} id = {styles.statusInput} onKeyPress = {HandleStatus}/>
            </section>

            <section className={styles.ContactInfo}>
            <h3>Contact Info</h3>
                <ul>
                    {user.city? <li><ApartmentIcon className = {styles.contactIcons}></ApartmentIcon><span>City: {user.city}</span></li> : ''}
                    {user.education?<li><SchoolIcon  className = {styles.contactIcons}></SchoolIcon><span>Education:  {user.education}</span></li> : ''}
                </ul>
                {(user.dob || user.marital_status) ?  
                    <a><InfoIcon id = {styles.contactIconsInfo}></InfoIcon><span>Show more information</span></a>
                    : 
                    <div className = {styles.noFriends}>
                        <p>No Contact Info</p>
                    <button>Add Contact Info</button>
                </div>
                }
               
            </section>

            <section  className={styles.Friends}>
                <h3>Friends <span>{user.friends? '3' : ''}</span></h3>
                {user.friends ?  
                <div id = {styles.FriendsContainer}>
                    <div className = {styles.SingleFriend}>
                        <img src="https://cdn.pixabay.com/photo/2017/06/24/02/56/art-2436545_960_720.jpg"></img>
                        <p>Vlada Haranina</p>
                    </div>
                    <div className = {styles.SingleFriend}>
                        <img src='https://cdn.pixabay.com/photo/2018/01/06/09/25/hijab-3064633_960_720.jpg'></img>
                        <p>Suzanna Kirch</p>
                    </div>
                </div> : 
                <div className = {styles.noFriends}>
                    <p>You have no friends</p>
                    <button>Find friends</button>
                </div>}
               

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
                    <label htmlFor="uploadImage">
                        <input type="file" id='uploadImage' hidden/>
                        <img src='/images/uploadPic.svg' />
                    </label>
                </div>

            </section>

            <section className={styles.postsWall}>

                <div className = {styles.singlePost}>
                    <div className = {styles.postHeader}>
                        <img src='https://cdn.pixabay.com/photo/2018/02/25/16/05/view-3180958_960_720.jpg' className={styles.userThumbnailPic}/>
                        <div className = {styles.post_UserData}>
                            <h5>Jhon Doe</h5>
                            <p>Sep 12 at 4:15pm</p>
                        </div>
                    </div>

                    <div className = {styles.postDescription}>
                        <p>Some random text from the database.</p>
                    </div>

                    <div className = {styles.postPicture}>
                        <img src='https://cdn.pixabay.com/photo/2019/01/23/11/07/animation-3950055_960_720.jpg' alt = 'from db'></img>
                    </div>

                    <div className = {styles.postInteraction}>
                      <div className = {styles.actionContainer}><FavoriteIcon  className = {styles.Likes}></FavoriteIcon> 15</div>
                      <div  className = {styles.actionContainer}><ModeCommentIcon  className = {styles.Comments}></ModeCommentIcon> 23</div>
                    </div>
                </div>

            </section>

            <Footer></Footer>
   
    </div>;
}

export default Profile;

