import mongoConnect from '../../utils/mongoConnect';
import  Encryption  from '../../validation/encryption';
import userSchema from '../../models/users_model';
// Registration 

export default async function register (req, res) {

    //encrypt the password
    
    const password = Encryption(req.body.password);

    // Create a model for parsing it to DB
    const newUser = {
        username: req.body.username,
        password: password,
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
    }

    try {
        //connection with db
        await mongoConnect();
        userSchema.create(newUser); 
        res.send('I got your request!');
    }
           
    catch (error){
        console.log(error)
        res.json({error})
    }

}