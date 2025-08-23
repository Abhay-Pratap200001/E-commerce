import express from "express";
import { createUser } from "../controllers/userController.js";
const router = express.Router();

router.route("/").post(createUser);   //create user Route


export default router;