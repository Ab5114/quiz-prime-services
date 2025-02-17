const User = require("../models/user");  

const authenticateUser = async (req, res, next) => {
  try {
   
    const userId = req.cookies.userId;
    if (!userId) {
      console.error("No userId cookie found, Unauthorized");
      return next();
    }

    let user = await User.findById(userId);

    

    req.user = user;  
    console.log("Authenticated user:", user);

    return next();  
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const requireAuth=(req,res,next)=>{
  if(!req.user)
  {  console.error("User Unauthorized");
     return res.status(401).json({ error: "Unauthorized" });
     }
    console.log("authorized  ");
    next();
}
const checkAuth = async (req, res) => {
  if (req.user) {
    return res.json({ isAuthenticated: true, user: req.user });
  } else {
    return res.json({ isAuthenticated: false });
  }
};

module.exports = { checkAuth, authenticateUser ,requireAuth};
