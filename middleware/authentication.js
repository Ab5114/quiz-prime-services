 
const authenticateUser = async (req, res, next) => {
  try {
     console.log("Cookies:", req.cookies);

    const userId = req.cookies.userId;
    console.log("userId:", userId); // Log the value of userId

    if (!userId) {
      console.log("No userId cookie found, Unauthorized");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Log the userId
    console.log("Authenticated userId:", userId);

  
    req.user = user;  
    console.log("Attached user to req");

    next(); // Move to the next middleware/handler
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


 
module.exports = {checkAuth,authenticateUser};
