import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import { useState } from 'react';
import { useRouter } from 'next/router';


const Footer = () => {


    return (        
        <footer>
            <section>
                <div>
                    <span>12</span>
                    <Diversity3Icon className = "footer-icons" ></Diversity3Icon>
                </div>
                <h4>Friends</h4>
            </section>
            <section>
                    <div>
                        <span>0</span>
                        <a href={`/profile/635ac84ec34e0bc1affa6976`}><HomeIcon className = "footer-icons"></HomeIcon></a>
                    </div>
                    <h4>Home</h4>
            </section>
            <section>
                <div>
                    <span>4</span>
                    <FeedIcon className = "footer-icons"></FeedIcon>
                </div>
                <h4>Feed</h4>
            </section>
        </footer>
    )

}

export default Footer