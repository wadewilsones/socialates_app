import UserSchema from '../../../../models/users_model'

export default async function addFriend(req, res){
  
    const sender = req.body.sender;
    const receiver = req.body.receiver;

    const query = {'_id' : sender.id};

    try{
        //Update friend requests 
        const receiverData = await UserSchema.findOneAndUpdate(query, sender);
        res.json({'friends':"Invintation was sent"});
    }
    catch(err){
        res.send({"Error": err})
    }


}