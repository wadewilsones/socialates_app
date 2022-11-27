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
import PublicIcon from '@mui/icons-material/Public';
import CakeIcon from '@mui/icons-material/Cake';
import ChurchIcon from '@mui/icons-material/Church';

const Profile = () => {

    const router = useRouter();
    const { id } = router.query;
    
    let [showInfo, setShowInfo] = useState(false);
    const [user, setUser] = useState({
        first_name: "", 
        last_name:"",
        profile_pic: "",
        status:"Some meaningful status",
        is_Online:'False',
        friends:"",
        marital_status:""
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
                let bDay;
                //Convert date to other format
                if(data.user.dob){
                    const date = new Date(data.user.dob);
                    console.log(date);
                    const month = new Intl.DateTimeFormat('en-US', {month:'long'}).format(date)
                    bDay = `${month} ${date.getDate()}`;
                    console.log(bDay)
                }

                //Update main information   
                setUser((prevState) => ({
                    ...prevState,
                    first_name: data.user.first_name, 
                    last_name:data.user.last_name,
                    profile_pic: data.user.profile_pic,
                    status:data.user.status,
                    is_Online:'True',
                    is_userProfile:'True',
                    friends:data.user.friends,
                    country:data.user.country,
                    education:data.user.education,
                    city:data.user.city,
                    dob:bDay,
                    marital_status:data.user.marital_status
                }))

              console.log(user.marital_status)
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
                {user != null ? 
                <div className={styles.ContactInfoExists}>
                    <button onClick={() => {router.push({pathname: `${id}/editProfile`, query: user})}}  className={styles.contactBtn} >Edit Info</button>
                    <ul>
                        {user.gender ? <li>{contactInfo.gender}</li> : ""}
                        {user.city? <li><ApartmentIcon className = {styles.contactIcons}></ApartmentIcon><span>City: {user.city}</span></li> : ''}
                        {user.education?<li><SchoolIcon  className = {styles.contactIcons}></SchoolIcon><span>Education:  {user.education}</span></li> : ''}

                        {(showInfo && user.dob)?
                            <li><CakeIcon className = {styles.contactIcons}></CakeIcon>Birthday: {user.dob}</li>
                        : ""}
                        {showInfo && (user.marital_status != "")? 
                        <li><ChurchIcon className = {styles.contactIcons}></ChurchIcon>Marital Status: {user.marital_status}</li> 
                        : ""}
                        {showInfo && user.country? <li><PublicIcon className = {styles.contactIcons}></PublicIcon>Country: {user.country}</li>: " "}          
                                              
                        {user.dob || user.marital_status ?  
                            <a onClick = {() => setShowInfo((prevState) => prevState? false : true)}>
                                <InfoIcon id = {styles.contactIconsInfo}></InfoIcon><span>Show {showInfo? "less" : "more"} information</span>
                            </a>

                         : 
                        ""}

                    </ul>
                </div>

                :
                
                <div>
                <button className={styles.contactBtn} onClick={() => {router.push({pathname: `${id}/editProfile`, query: id})}}>Add Contact Info</button>
                </div>

                }
               
            </section>

            <section  className={styles.Friends}>
                <h3>Friends <span>{user.friends? '3' : ''}</span></h3>
                {user.friends != '' ?  
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
                <h3>Photos <span>12</span></h3>
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

