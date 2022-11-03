// Get user information from the db
import UserSchema from '../../../models/users_model';

export default async function userData (req, res){
    const id_param = req.query;
    const id = id_param.id;
    console.log(id);
    //Make a request to db
    const userData = await UserSchema.findById(id).exec();
    console.log(userData);

    res.json({user:userData});
}