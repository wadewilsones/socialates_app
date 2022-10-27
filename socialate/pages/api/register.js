import mongoConnect from '../../utils/mongoConnect';
import UserSchema from '../../models/users_model';
const bcrypt = require('bcrypt');
// Registration 

export default async function register (req, res) {

    //encrypt the password
    
    //const password = Encryption(req.body.password);

    const saltRounds = 10;
    const newPassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(typeof newPassword);
    // Create a model for parsing it to DB
    const userData = {
        username: req.body.username,
        password: newPassword,
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
    }

    try {
        //connection with db
        await mongoConnect()
        const newUser = new UserSchema(userData);
        newUser.save((err) => {
            if(err){
                console.log(err)
                res.send(err);
            }
            else{
                res.send('User was created!');
            }
        })
    }

    catch (error){
        console.log(error)
        res.json({error})
    }

}