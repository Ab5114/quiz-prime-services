const User = require("../models/user");  

const authenticateUser = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);

    const userId = req.cookies.userId;
    if (!userId) {
      console.error("No userId cookie found, Unauthorized");
      return res.status(401).json({ error: "Unauthorized - No userId cookie" });
    }

    let user = await User.findById(userId);

     if (!user) {
      console.log("New user detected, creating user...");
      user = new User({ _id: userId, quizzes: [] });  
      await user.save();
    }

    req.user = user;  
    console.log("Authenticated user:", user);

    next();  
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  if (req.user) {
    return res.json({ isAuthenticated: true, user: req.user });
  } else {
    return res.json({ isAuthenticated: false });
  }
};

module.exports = { checkAuth, authenticateUser };
