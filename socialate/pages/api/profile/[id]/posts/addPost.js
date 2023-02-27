import { isLogged } from '../../../../../utils/isLogged';
import PostsSchema from '../../../../../models/posts_model';
import mongoConnect from '../../../../../utils/mongoConnect';

export default async function addPost(req, res) {
    
    const { authroziation } = req.headers;

    if(isLogged(authroziation)){

        try{
            const postData = {
                author:req.body.author,
                content: req.body.content,
                date_created: req.body.date_created
            }

        //connection with db

        await mongoConnect()
        const newPost = new PostsSchema(postData);
        newPost.save((err) => {
            if(err){
                console.log(err)
                res.status(500).send(err);
            }
            else{
                res.status(201).send({status:"Created"})
            }
        })
          
        }
        catch(err){
            console.log(err);
            res.status(500).send({status:"Something went wrong!"})
        }
    }
    else{
        res.status(401).send({status:'Not authorized'})
    }
}