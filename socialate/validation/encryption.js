const bcrypt = require('bcrypt');

export const Encryption = (password) => {

    const saltRounds = 10;
    const newPassword = bcrypt.hashSync(password, saltRounds);
    return newPassword
}