// Authentication with JWS tokens
import * as jose from 'jose';
import UserSchema from '../../models/users_model'
import MongoConnect from '../../utils/mongoConnect';
import bcrypt from 'bcrypt';

export default async function auth (req, res) {

    const { username, password } = req.body;
    // Connect to DB and find a user
    try{

        await MongoConnect()
        const userExists = await UserSchema.findOne({ username: username }).exec();
        if(!userExists) {
            console.log('Not found')
            res.status(400).json({err: "User doesn't exists"});
        }
        else
        {
            // Compare passwords
            const dbPassword = userExists.password;
            const isMatch = await bcrypt.compare(password, dbPassword);
            if(isMatch){
                res.send({message:'Welcome'})
            }
            else{
                res.json({err:"Wrong Password"})
            }

        }

    }
    catch(err){
        console.log(err);
        res.status(500);
        res.send('Error occured during db connection')
    }

   

}