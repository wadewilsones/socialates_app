import mongoConnect from '../../utils/mongoConnect';
import UserSchema from '../../models/users_model';

export default async function displayUsers (req, res) {
    //Connect with DB
    await mongoConnect()
    const people = await UserSchema.find().exec();
    let size;
    //Create an object with First and Last name
    const userObject = [];
    if(people.length > 10){
        size = 10;
    }
    else{
        size = people.length;
    }
    for(let i = 0; i < size; i++){
        let users = {};
        users["fName"] = people[i].first_name;
        users["lName"] = people[i].last_name;
        users["id"] = people[i]._id;
        userObject.push(users);
    }

    res.json({"users":userObject});
}
