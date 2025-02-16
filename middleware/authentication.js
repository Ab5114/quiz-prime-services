 
const authenticateUser = async (req, res, next) => {
  try {
    // Log all cookies
    console.log("Cookies:", req.cookies);

    const userId = req.cookies.userId;
    console.log("userId:", userId); // Log the value of userId

    if (!userId) {
      console.log("No userId cookie found, Unauthorized");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Log the userId
    console.log("Authenticated userId:", userId);

    // You might want to fetch user details from DB or use userId as needed:
    // const user = await getUserFromDB(userId); (example, based on your logic)

    req.user = user; // You need to define `user`, probably by fetching from DB
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
