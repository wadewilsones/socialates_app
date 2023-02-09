import { deleteCookie } from 'cookies-next';

export default function logout(req, res){
    
    //Delete all cookie
    deleteCookie("user");
    deleteCookie("token");
    res.json({"isLogged":false});
}