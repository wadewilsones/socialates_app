import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import styles from "../../../../styles/friendList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { ThemeContext } from "@emotion/react";
import { getCookie } from 'cookies-next';

export default function friendList(){

    const router = useRouter();
    const [friendRequests, setFriendReqs] = useState([]);

    useEffect(() => {

        //Fetch all friends

        if(!router.isReady){
            return
        }
        else{

            const { id } =  router.query;
            fetch(`/api/profile/${id}/friends/listFriends`, {
                method:'GET'
            })
            .then(res => res.json())
            .then(data => {
                setFriendReqs(data.reqSenderInfo); 
             
            });
        }
                
        },[router.isReady, friendRequests])

    //Accept friend
    const acceptFriend = (e) => {
        e.preventDefault();
        const parentElement = e.target.parentElement;
        console.log(parentElement.getAttribute('id'))
        fetch(`/api/profile/${router.query.id}/friends/acceptFriend`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie("token")}`
            },
            body: JSON.stringify({
                receiverId: router.query.id,
                senderId: parentElement.getAttribute('id')
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    //Reject Friends
    const rejectFriend = (e) => {
        e.preventDefault();
        alert("Removed")
    }
    

    //Get all friends
    return (
        <div className={styles.friendListContainer}>
            <Header></Header>
            <h1>Friend List</h1>
            {friendRequests.length > 0? <h3>Friend Requests</h3> : " "}
            {
            friendRequests.length > 0? 

                friendRequests.map((el) => 
                <div className = {styles.friendReq_block} key = {el.id} id = {el.id}>
                    {/*Add profile picture*/}
                    <li key = {el.id}>{el.name}</li>
                    <button onClick = {acceptFriend}>Accept</button>
                    <button  onClick = {rejectFriend}>Reject</button>
                </div>
                )
            : ""
            }
            <Footer></Footer>
        </div>

    )
}