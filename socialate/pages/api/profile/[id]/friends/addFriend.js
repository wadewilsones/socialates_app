import UserSchema from '../../../../../models/users_model'

export default async function addFriend(req, res){
  
    const { sender, receiver, status } = req.body;

    try{
        
        //Update friend requests 
        if(status != "Cancel"){
            const friendInventations = await UserSchema.findById(sender)
            const receiverData = await UserSchema.findByIdAndUpdate(receiver,  {$addToSet: {friendRequests: sender}});
    
            //Update sender requests to keep track on invintations
    
            const updateSenderRequests = await UserSchema.findByIdAndUpdate(sender,  {$addToSet: {frinedsInvintations: receiver}});
    
            //Update array
            res.status(200).json({invStatus: "Pending"});
        }

        else{
            const receiverData = await UserSchema.findByIdAndUpdate(receiver,  {$pull: {friendRequests: sender}});
    
            //Update sender requests to keep track on invintations
    
            const updateSenderRequests = await UserSchema.findByIdAndUpdate(sender,  {$pull: {frinedsInvintations: receiver}});
            res.status(200).json({invStatus: "Cancel Request"});
        }

    }
    catch(err){
        res.status(500).send({"Error": err})
    }


}