import UserSchema from '../../../../../models/users_model'

export default async function listUserFriends(req, res){
    const { id } = req.query;
    const status = req.body.status;
    try{
        const data = await UserSchema.find();
        res.json({'friends':data.friends});
    }
    catch(err){
        res.send({"Error": err})
    }

    //Update status of the user

}