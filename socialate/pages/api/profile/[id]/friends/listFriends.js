import UserSchema from '../../../../../models/users_model'

export default async function listUserFriends(req, res){
    const { id } = req.query;
    //const status = req.body.status;
    try{
        const data = await UserSchema.findById(id).populate('friendRequests');
        const reqSenderInfo = [];
        for (let i = 0; i < data.friendRequests.length; i++){
            reqSenderInfo.push({
                name: data.friendRequests[i].first_name + " "+ data.friendRequests[i].last_name, // add picture too
                id: data.friendRequests[i]._id
            })
        }
        res.status(200).send({reqSenderInfo});
    }
    catch(err){
        res.send({"Error": err})
    }

    //Update status of the user

}