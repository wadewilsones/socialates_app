import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import cookie from "js-cookie";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


 const Footer = () => {

    const router = useRouter();

    const[id, setId] = useState();
    const[userData, setData] = useState({
        friendRequest: 0,
        chats: 0
    });

    useEffect(()=>{

        const newId = cookie.get("user");
        setId(newId);
        //Get data to display notifications
        fetch(`/api/profile/${newId}/footerData`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"id": newId})
        })
        .then(data => data.json())
        .then(data => {
            setData((prevState) => ({

                ...prevState,
                friendRequest: data.friendRequests,
            }))
        })
    },[])

    //Call to check current user id
    return (        
        <footer>
            <section>
                <div onClick={() => {router.push({pathname: `/profile/${id}/friends/friendList`})}}>
                    <span className = {userData.friendRequest == 0? "emptyNotificationSpan" : "spanShowsReqs"}>{userData.friendRequest == 0? "" : userData.friendRequest}</span>
                    <Diversity3Icon className = "footer-icons" ></Diversity3Icon>
                </div>
                <h4>Friends</h4>
            </section>
            <section>
                    <div>
                        <a href={`/profile/${id}`}><HomeIcon className = "footer-icons"></HomeIcon></a>
                    </div>
                    <h4>Home</h4>
            </section>
            <section>
                <div>
                <span className='spanShowsReqs'>12</span>
                    <img src="/images/chat.svg" className = "footer-icons"/>
                </div>           
                <h4>Chats</h4>
            </section>
        </footer>
    )

}

export default Footer