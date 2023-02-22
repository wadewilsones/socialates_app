import UserSchema from '../../../../../models/users_model'
import { isLogged } from '../../../../../utils/isLogged'

export default async function acceptFriend(req,res){

    //test auth

    const { authorization } = req.headers;
    //Check is user logged in
    const authorized = await isLogged(authorization);
    if(authorized){
    //Get user id
    const { receiverId } = req.body;
    const { senderId } = req.body;
    //Add requested user to current user friend list
    console.log(senderId);
    try{
        const updates = await UserSchema.findByIdAndUpdate(receiverId, { $addToSet: {friends: senderId}, $pull:{friendRequests: senderId}}) //add to friend list
        // remove from requests list
        res.status(200).json({response:"Friend was accepted"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
       
    }

    else{
        res.status(401).json({Error:'Unauthorized access'})
    }
    

}