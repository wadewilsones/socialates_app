import UserSchema from '../../../../models/users_model'

export default async function changeStatus(req, res){
    const { id } = req.query;
    const status = req.body.status;
    try{
        await UserSchema.findByIdAndUpdate(id, { status: status });
        res.json({'status':'Updated'});
    }
    catch(err){
        res.send({"Error": err})
    }

    //Update status of the user

}