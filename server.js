// server.js
require("dotenv").config();
 

const express = require("express");
const app = express();
const mongoose=require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");



 
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",  
    credentials: true,  
  })
);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

 
app.use("/user",userRoutes);

 

const PORT=5025;
app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`));
