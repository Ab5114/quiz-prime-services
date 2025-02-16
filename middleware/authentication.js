const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  try {
    const userId = req.cookies.userId; // Read `userId` from cookie
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
 console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;  
    console.log("Attached user to req");
    next();  
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



 
const checkAuth = async (req, res) => {
  try {
    const userId = req.cookies.userId;  
    console.log("userid in checAuth",userId);
    if (!userId) {
      return res.json({ isAuthenticated: false, user: null });
    }

    const user = await User.findById(userId).select("-password");  
    if (!user) {
      console.log("retuened false since not found user")
      return res.json({ isAuthenticated: false, user: null });
    }
console.log("retuened true");
    res.json({ isAuthenticated: true, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

 
module.exports = {checkAuth,authenticateUser};
