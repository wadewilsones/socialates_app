import jwt from "jsonwebtoken";

//Create a token
export const CreateTokens = (user) => {
    const accessToken = jwt.sign({userid: user._id}, process.env.JWT_SECRET_KEY);
    return accessToken;
};
