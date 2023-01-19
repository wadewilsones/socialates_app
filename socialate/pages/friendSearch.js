import Footer from "../components/footer";
import Header from "../components/header";
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
export default function friendSearch(){

// Display 10 people from DB

const [peopleList, setPeopleList] = useState(null);

// If user used search input, make a call to backend

useEffect(() => {

    fetch('/api/listUsers', {
        method:'GET'
    })
    .then(res => res.json())
    .then(data => {
        setPeopleList(data.users);
    })
}, [])

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
                <section>
                    {peopleList.map(person => <li key = {person.id}>{person.fName + " " + person.lName}</li>)}
                </section>
                //If there is no users at all display
                :<section className={styles.noFriends}>No people found.<br></br>But you can invite someone!</section>}

            </main>

            <Footer></Footer>
        </div>
    )

}