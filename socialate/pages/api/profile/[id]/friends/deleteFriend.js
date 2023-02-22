import UserSchema from '../../../../../models/users_model'

export default async function deleteFriend (req, res) {

    //Get both sides
    const { currentUserId } = req.body;
    const { userToDelete} = req.body;

    //Remove friends from both files
    try{

        const updateCurrentUser = await UserSchema.findByIdAndUpdate(currentUserId, {$pull: {friends: userToDelete}});
        const updateDeletedFriend = await UserSchema.findByIdAndUpdate(userToDelete, {$pull: {friends: currentUserId}});
        res.status(200).json({action:"User deleted"})
    }
    catch(err){
        res.status(500).send({error:err})
    }

    
}