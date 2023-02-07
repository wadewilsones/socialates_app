import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {

    const logout = () =>{
        alert ("Log out was pressed");
        
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