
export const Encryption = (password) => {
    
    const saltRounds = 10;
    const newPassword = bcrypt.hashSync(password, saltRounds);
    return newPassword;
}

export const BaseConvert = (stringtoConvert) => {
    let password = Buffer.from(stringtoConvert, "utf8");
    password = password.toString("base64");
    return password;
}

