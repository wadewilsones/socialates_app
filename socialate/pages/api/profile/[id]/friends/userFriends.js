import UserSchema from '../../../../../models/users_model'

export default async function userFriends(req, res){
    const { id } = req.query;
    //const status = req.body.status;
    try{
        const data = await UserSchema.findById(id).populate('friends');
        const friendsContainer = [];

        for (let i = 0; i < data.friends.length; i++){
            friendsContainer.push({
                name: data.friends[i].first_name + " "+ data.friends[i].last_name, // add picture too
                id: data.friends[i]._id
            })
        }
        console.log(friendsContainer)
        res.status(200).send({friendsContainer});
    }
    catch(err){
        res.send({"Error": err})
    }

    //Update status of the user

}