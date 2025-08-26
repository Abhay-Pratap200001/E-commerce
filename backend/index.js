// Importing required packages
import express from "express";     
import path from "path";                        // Path helps to work with file & folder paths 
import dotenv from "dotenv";        
import cookieParser from "cookie-parser";       // Middleware to read cookies from the client request
import { connectDB } from "./config/db.js";     //importing db
import userRoutes from "./routes/userRoutes.js" 
dotenv.config();
const port = process.env.PORT || 5000;


// Connect to MongoDB database
connectDB();


// Initialize express app
const app = express();


/* ---------------- MIDDLEWARE ---------------- */
// Middleware = Functions that run before the request reaches your routes


app.use(express.json()); // Parses incoming JSON data from client requests, POST requests with JSON body


// Parses form data (from HTML forms), so server can read it properly
// extended: true  allows nested objects in form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //Extracts cookies from the request headers so you can access them with req.cookies


app.use("/api/users", userRoutes);  //user auth api


/* ---------------- START SERVER ---------------- */
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});



/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Hello world"); // Simple route to test server
});
