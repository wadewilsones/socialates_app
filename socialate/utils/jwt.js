import jwt from "jsonwebtoken";
dote

//Create a token
const createTokens = (user) => {
    const accessToken = jwt.sign({userid: user._id}, process.env.JWT_SECRET_KEY);
}