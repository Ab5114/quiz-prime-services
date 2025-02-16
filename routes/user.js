// routes/user.js
const { Router } = require("express");
const bcrypt = require("bcrypt");

const router = Router();
const User = require("../models/user");
const Quiz = require("../models/quiz");
const {authenticateUser ,checkAuth} = require("../middleware/authentication");
 
router.get("/quizzes", authenticateUser, async (req, res) => {
        console.log("hellohellohellohellohello1234444");

  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("authorized  ")
     const quizzes = await Quiz.find({ created_By: userId });  
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/create-quiz", authenticateUser, async (req, res) => {
 
  try {
    const { title, description, questions } = req.body;

    if (!title || !description || !questions || questions.length === 0) {
      return res.status(400).json({
        error:
          "All fields are required, and at least one question must be added.",
      });
    }
console.log(req.body);
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      created_By: req.user._id,  
    });

    await newQuiz.save();
    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/signin", async (req, res) => {
      if (req.user) {alert("Already logged In"); return res.status(404).json("Already logged In");}
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
const isProduction = process.env.NODE_ENV === "production";

 
res.cookie("userId", user._id.toString(), {
  httpOnly: true,
   sameSite: "None", 
  maxAge: 24 * 60 * 60 * 1000,
  path: "/", 
 });



    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});




router.delete("/delete-quiz/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
});



router.put("/edit-quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const updatedQuiz = req.body;  

    const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuiz, {
      new: true,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
});


router.post("/logout",(req,res)=>{
   res.clearCookie("userId", { path: "/", sameSite: "lax" });
   res.json({ message: "Logged out successfully" });  
})


router.get("/checkAuth", authenticateUser,checkAuth);

module.exports = router;
