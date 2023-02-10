import UserSchema from '../../../../../models/users_model'

export default async function addFriend(req, res){
  
    const { sender, receiver } = req.body;

    try{
        //Update friend requests 
        const receiverData = await UserSchema.findByIdAndUpdate(receiver,  {$addToSet: {friendRequests: sender}});

        //Update sender requests to keep track on invintations

        const updateSenderRequests = await UserSchema.findByIdAndUpdate(sender,  {$addToSet: {frinedsInvintations: receiver}});

        //Update array
        res.status(200).json({"invStatus" : "pending"});
    }
    catch(err){
        res.status(500).send({"Error": err})
    }


}