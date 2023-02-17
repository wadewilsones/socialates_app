import UserSchema from "../../../../models/users_model"

export default async function footerData(req, res) {

    const { id } = req.body;
    const userParams = await UserSchema.findById(id);
    //This data will be sent to front-end
    const userInfo = {
        friendRequests: userParams.friendRequests.length
    }
    res.status(200).send(userInfo);
}