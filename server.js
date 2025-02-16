// server.js
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(cookieParser());
const allowedOrigins = [
  "https://quizzy-prime.vercel.app", // Production frontend
  "http://localhost:3000", // Localhost for development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow requests from allowed origins or if there is no origin (e.g., Postman)
        callback(null, true);
      } else {
        // Block any origin that is not allowed
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/credentials
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
