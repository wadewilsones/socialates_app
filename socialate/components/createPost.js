import styles from "../styles/posts.module.css";
import { useState } from 'react';
import { useRouter } from "next/router";
import getDate from "../utils/getDate";
import { getCookie } from "cookies-next";

const CreatePost = () => {

    const router = useRouter();
    const { id } = router.query;
    const token  = getCookie('token');
    const [post, setPost] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setPost(e.target.value);
    }

    const createPost = (e) => {
        e.preventDefault();
        const timestamp = getDate();
        //Create body 
        const postInfo = {
            author: id,
            content: post,
            date_created: timestamp.fullDate
        }
        
        fetch(`/api/profile/${id}/posts/addPost`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authroziation: `Bearer ${token}`
            },
            body: JSON.stringify(postInfo)
        })
        .then (res => res.json())
        .then(data => console.log(data))
    }


    return (
    <section className={styles.CreatePost}>
    <h3>Create a Post</h3>
        <form onSubmit={createPost}>
            <input type="text" placeholder="Got something to say?" onChange={handleInput} value = {post}></input>
            <label htmlFor="uploadImage">
                <input type="submit" value = "Post"/>
            </label>
        </form>

    </section>
    )
}

export default CreatePost;