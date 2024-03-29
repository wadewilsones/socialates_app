import UserSchema from '../../../../../models/users_model'

export default async function rejectFriend(req,res){
      
    //Get user id
    const { receiverId } = req.body;
    const { senderId } = req.body;
    //Add requested user to current user friend list
    try{
        const updates = await UserSchema.findByIdAndUpdate(receiverId, {$pull: {friendRequests: senderId}})
        res.status(200).json({response:"Friend request was rejected"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
       
    
}