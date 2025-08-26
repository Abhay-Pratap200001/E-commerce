import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => { // authenticated for protected route
  let token;
  token = req.cookies.jwt;                                       //accepting cookie from client 

  if (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decoding token which comes from client
        req.user = await User.findById(decoded.userId).select("-password");//find id in mongodb which comes with token in req if match send but dont send password
        next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed..");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token..");
  }
});




//admin funtion
const authorizeAdmin = (req, res, next) =>{  
    if (req.user && req.user.isAdmin) {  //if user is logedin and also a admin give access to get all users data
        next()
    }else{
        res.status(401).send("Not authorized as an admin")
    }
}


export {authenticate, authorizeAdmin};