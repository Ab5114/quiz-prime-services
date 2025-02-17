// server.js
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticateUser } = require("./middleware/authentication");

app.use(express.json());

app.use(cookieParser());
const allowedOrigins = [
  "https://quizzy-prime.vercel.app",
  "http://localhost:3001",
  "http://localhost:3002",
];

app.use(
  cors({
    origin: (origin, callback) => {
       if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/user", userRoutes);
 
const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);
