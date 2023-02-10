import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import styles from "../../../../styles/Home.module.css";
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { Router } from "next/router";
import { useRouter } from 'next/router'
export default function friendSearch(){

// Display 10 people from DB

const [peopleList, setPeopleList] = useState(null);

const router = useRouter();
const token = getCookie("token");
// If user used search input, make a call to backend

useEffect(() => {

    if(!router.isReady){
        return
    }
    else{
        const id = router.query.id;

        fetch(`/api/profile/${id}/friends/listUsers`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }, 
            body: JSON.stringify({
                userId:id
              })
        })
        .then(res => res.json())
        .then(data => {
            setPeopleList(data.users);
        })
    }
    
}, [router.isReady])

//After user clicked Add Frined button
const sendFriendRequest = (e) => {
    e.preventDefault();
    const id = router.query.id;
    const requestSides = {
        "sender": id,
        "receiver": e.target.parentNode.id
    }
    //Fetch api

    fetch(`/api/profile/${id}/friends/addFriend`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json', // add this t osend json
            Authorization: `Bearer ${token}`
        }, 
        body: JSON.stringify(requestSides)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}

//If user clicked on name or image

const showPage = (e) => {

    const userId = e.target.parentNode.id;
    //Send to yser page
    e.preventDefault();
    e.target.value = "Cancel"
    router.push(`/profile/${userId}`);
}

    return (
        <div>
            <Header></Header>
        {/* SEARCH SECTION */}
            <section className={styles.searchFriend}>
                <form>
                    <input type="text" name = "friendName" placeholder="Search..."></input>
                    <input type="submit" value="Search"></input>
                </form>
               
            </section>

       {/* AVAILABLE FRIENDS SECTION */}

            <main className={styles.listOfPeople}>
                <h1>Possible Friends</h1>

                {(peopleList != null)? 
                //Display people
                <section className={styles.FriendsDisplayContainer}>
                    {peopleList.map(person => 
                    <div className={styles.singleFriend} id = {person.id} key = {person.id}>
                        <img src="https://cdn.pixabay.com/photo/2020/12/23/21/21/macarons-5856039_1280.jpg" onClick = {showPage}></img>
                        <a>{person.fName + " " + person.lName}</a>
                        <button onClick = {sendFriendRequest}>Add Friend</button>
                    </div>)}
                </section>
                //If there is no users at all display
                :<section className={styles.noFriends}>No people found.<br></br>But you can invite someone!</section>}

            </main>

            <Footer></Footer>
        </div>
    )

}