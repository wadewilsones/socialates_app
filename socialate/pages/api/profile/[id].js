// Get user information from the db
import { truncateSync } from 'fs';
import UserSchema from '../../../models/users_model';
import { isLogged } from '../../../utils/isLogged';

export default async function userData (req, res){
    const id_param = req.query;
    const id = id_param.id;

    const { authorization } = req.headers;
    //Check is user logged in
    const authorized = await isLogged(authorization);

    if(authorized){
        const userData = await UserSchema.findById(id).exec();
        res.status(200).json({user:userData, authorization:true});
    }
    else{
        res.status(401).json({authorization:false})
    }

}