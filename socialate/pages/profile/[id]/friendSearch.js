import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from 'react';
import { Router } from "next/router";
import { useRouter } from 'next/router'
export default function friendSearch(){

// Display 10 people from DB

const [peopleList, setPeopleList] = useState(null);
const [isPending, setFrinedStatus] = useState(false);

const router = useRouter();

// If user used search input, make a call to backend

useEffect(() => {

    if(!router.isReady){
        return
    }
    else{
        const id = router.query.id;
        console.log('This will be send to server:' + id)
        fetch(`/api/profile/${id}/listUsers`, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify({
                userId:id,
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
    alert('Friend request was sent to ' + e.target.parentNode.id);
    setFrinedStatus(true);
}


//If user clicked on name or image

const showPage = (e) => {

    const userId = e.target.parentNode.id;
    //Send to yser page
    e.preventDefault();
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
                    <div className={styles.singleFriend} id = {person.id}>
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