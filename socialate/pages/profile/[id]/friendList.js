import Header from "../../../components/header";
import Footer from "../../../components/footer";
import styles from "../../../styles/friendList.module.css";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function friendList(){

    //Get all friends
    return (
        <div className={styles.friendListContainer}>
            <Header></Header>
            <h1>Friend List</h1>
            <Footer></Footer>
        </div>

    )
}