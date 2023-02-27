// Get user information from the db
import { truncateSync } from 'fs';
import { getCookie } from 'cookies-next';
import UserSchema from '../../../models/users_model';

import { isLogged } from '../../../utils/isLogged';

export default async function userData (req, res){
    const id_param = req.query;
    const id = id_param.id;

    const { authorization } = req.headers;
    //Check is user logged in
    const authorized = await isLogged(authorization);

    if(authorized){
        const userData = await UserSchema.findById(id).populate('friends').exec();

        const userInfo = {
            id: userData._id,
            first_name:userData.first_name,
            last_name:userData.last_name,
            status:userData.status,
            country:userData.country,
            city:userData.city,
            dob:userData.dob,
            marital_status:userData.marital_status,
            is_Online:userData.is_Online,
            profile_pic:userData.profile_pic,
        }

        //Add friends data to array
        const userFriendData = [];
        

        for(let i = 0; i < userData.friends.length; i++){
            userFriendData.push({
                friends_name:userData.friends[i].first_name + " " +userData.friends[i].last_name,
                friendId: userData.friends[i].id
            })
        }
        //Test is requests id matches with logged user
        const loggedUserId = getCookie('user', {req, res});
        let userStatus;

        if(id != loggedUserId){
            userStatus = false;
        }
        else{
            userStatus = true;
        }
        console.log('Sending status ' + userStatus)
        res.status(200).json({userInfo:userInfo, userFriendReqs: userFriendData, authorization:true, isLoggedUser: userStatus});
    }
    else{
        res.status(401).json({authorization:false})
    }

}