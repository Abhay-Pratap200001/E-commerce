import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/ceateToken.js";

const createUser = asyncHandler(async (req, res) => {  // create new user
  //Register user function
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All inputs are requires");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(7);  // salt seven round to secure password
  const hashedPassword = await bcrypt.hash(password, salt);  //hashed the password which come from body
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      message: "User register succesfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid credantials");
  }
});





const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password, existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
        message: "User login succesfully",
      });
      return;
    }
  }
});




const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});




//normal user function
const getCurrentUserProfile = asyncHandler(async (req, res) => {                       // get user profile by user_.id
const user = await User.findById(req.user._id);                                  //accepting user by id in params

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("User Not Exist for get profile");
  }
});





//normal user function
const updateCurrentUserProfile = asyncHandler(async(req, res)=>{  
  const user = await User.findById(req.user._id)                                 //accepting user by id in params

  if (user) {
    user.username = req.body.username || user.username                           //if user has send new username in body as request then update it other wise keep previous one
    user.email = req.body.email || user.email

    if (req.body.password) {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword                                            //if password is comes in request then update with hashedpassword or keep previous one
    }

    const updateUser = await user.save();                                        // save updated user in db 
    res.json({                                                     //send respose
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
  }else{
    res.status(401);
    throw new Error("User not Exist for update profile")
  }
})




//Admin function controller
const deleteUserById = asyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.id)                               //accepting user id in params 

  if (user) { 
    if (user.isAdmin){
      res.status(400)
      throw new Error("Cannot delet admin user");                              //if user id which comes in params its admin then dont update 
    }
    await User.deleteOne({_id: user._id})                                   // if every thing is go well save updated user in db
    res.json({message: "User removed"})
    
  }else{
    res.status(404)
    throw new Error("User Not found");
  }

})


//admin function controller

const getUserById = asyncHandler(async(req, res)=>{
const user = await User.findById(req.params.id).select("-password");               //get user in params by id but dont give password
  if (user) {
    res.json(user)                                                                 //if user is send user to client
  }else{
    res.sataus(404)
    throw new Error("User Not found");
  }
})


//admin function controller
const updateUserById = asyncHandler(async(req, res)=>{  
   const user = await User.findById(req.params.id)                                 //accepting user id in params

   if (user) { 
    user.username = req.body.username || user.username                             //if user has send new updated value then update that or keep previous one
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updateUser = await user.save()                             // save changes in db

    res.json({       //send res
      _id: updateUser._id,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
   }else{
    res.sataus(404)
    throw new Error("User Not found");
  }
})


export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};
