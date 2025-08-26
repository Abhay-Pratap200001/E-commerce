import express from "express";
import { createUser, getAllUsers, loginUser, logoutCurrentUser, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"; // middlewares for protected routes
const router = express.Router();

router.route("/")
.post(createUser)//create user Route 
.get(authenticate, authorizeAdmin, getAllUsers);//acces users data route if user is authenticate & authorizeAdmin then he is able to acces all user data  for admin
router.post('/auth', loginUser)
router.post("/logout", logoutCurrentUser)


//user route 
router.route('/profile')
.get(authenticate, getCurrentUserProfile)// profile route
.put(authenticate, updateCurrentUserProfile);// update profile route for normal user



//admin route
router.route("/:id")
.delete(authenticate, authorizeAdmin, deleteUserById)//delete user route by admin 
.get(authenticate, authorizeAdmin, getUserById)//get single user by id  by admin
.put(authenticate, authorizeAdmin, updateUserById) //update user by admin


export default router;