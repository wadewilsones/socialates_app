import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import cookie from "js-cookie";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


 const Footer = () => {

    const router = useRouter();

    const[id, setId] = useState();
    useEffect(()=>{

        const newId = cookie.get("user");
        setId(newId);
    },[])

    //Call to check current user id
    return (        
        <footer>
            <section>
                <div onClick={() => {router.push({pathname: `/profile/${id}/friendList`})}}>
                    <span>7</span>
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
                <span>12</span>
                    <img src="/images/chat.svg" className = "footer-icons"/>
                </div>           
                <h4>Messages</h4>
            </section>
        </footer>
    )

}

export default Footer