import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {

    const router =  useRouter();
    const logout = () =>{
        alert ("Log out was pressed");
        fetch("/api/logout", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            deleteCookie("user");
            deleteCookie("token");
            router.push('/')
        })
        
    }
    return (        
        <header>
            <div>
                <h4>Socialates</h4>
                <h6>Stay Social</h6>
            </div>
            <div className='headerLogOut' onClick = {logout}>
                <LogoutIcon className='headerIcon'/>   
                <p>Log out</p>
            </div>

        </header>
    )

}

export default Header