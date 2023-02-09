import jwt from './jwt';

export const isLogged = async (authorization) => {

    console.log("Inside login" + authorization);
    const token = authorization.split (' ')[1];
    if(token != "undefined"){
        try{
            const js = await jwt.verify(token, 'token');
            if(js){
                return true
            }
            else{
                return false
            }
           
        }
        catch(err){
          return(err)
        }
    }
    else{
        return false;
    }


}