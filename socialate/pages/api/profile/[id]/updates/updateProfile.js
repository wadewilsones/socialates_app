import UserSchema from '../../../../../models/users_model'

export default async function updateProfile(req, res){
    const { id } = req.query;
    const userDate = req.body.userData;
    try{
        await UserSchema.findByIdAndUpdate(id, { 
            first_name: userDate.first_name,
            last_name: userDate.last_name,
            gender:userDate.gender,
            education:userDate.education,
            country:userDate.country,
            city:userDate.city,
            dob:userDate.dob,
            marital_status:userDate.marital_status,
            profile_pic: userDate.profile_pic
        
        });
        res.json({'status':'Updated'});
    }
    catch(err){
        res.send({"Error": err})
    }

}