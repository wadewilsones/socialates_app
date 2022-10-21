import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';

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
                        <HomeIcon className = "footer-icons"></HomeIcon>
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