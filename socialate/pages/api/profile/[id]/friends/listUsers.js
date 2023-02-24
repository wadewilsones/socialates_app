import mongoConnect from '../../../../../utils/mongoConnect';
import UserSchema from '../../../../../models/users_model';

export default async function displayUsers (req, res) {
    const { id }  = req.query;
    //Connect with DB and find all users in the media
    await mongoConnect()
    const people = await UserSchema.find().exec();
    let size;
    //Create an object with First and Last name
    const userObject = [];

    //Set size for possible friends
    if(people.length > 10){
        size = 10;
    }
    else{
        size = people.length;
    }

       //for all users check their friends requests lists
    //Fill out response
    for(let i = 0; i < size; i++){

    
        let users = {};
        users["fName"] = people[i].first_name;
        users["lName"] = people[i].last_name;

        for(let n = 0; n < people[i].friendRequests.length; n++){
            if(people[i].friendRequests[n] == id){
                users["friendRequestStatus"] = "Pending"
            }
            else{
                users["friendRequestStatus"] = "Not Added"
            }
        }
        users["id"] = people[i]._id;

        //Remove the user's own  profile from the search
        if(users["id"] != req.body.userId){
            userObject.push(users);

        }


    }

    res.json({"users":userObject});
}
