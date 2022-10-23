export const validatePassword = (password) => {

    const user_password = password;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
    
    if(user_password.match(pattern)){
        return true
    }
    else{
        return false
    }
}

export const validateName = (name) => {

    const user_name = name;
    const pattern = /^[A-Za-z]{2,}$/g
    
    if(user_name.match(pattern)){
        return true
    }
    else{
        return false
    }
}

