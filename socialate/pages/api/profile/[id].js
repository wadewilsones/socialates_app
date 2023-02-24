// Get user information from the db
import { truncateSync } from 'fs';
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
        console.log(userData);

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
        }

        const userFriendData = {
            friends:userData.friends,
            friendRequests:userData.friendRequests,
            friendInvintation:userData.friendInvintation
        }


        res.status(200).json({userInfo:userInfo, userFriendReqs: userFriendData, friendsauthorization:true});
    }
    else{
        res.status(401).json({authorization:false})
    }

}