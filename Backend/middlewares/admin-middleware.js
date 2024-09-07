const adminMiddlware = async (req, res, next) => {
  try {
    const isAdmin = req.user.role;
    if (isAdmin !== "admin") {
     return res.status(403).json({ message: "User is not admin access denied" });
    }
    next();
  } catch (error) {
    console.error("Authorization failed:", error);
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

module.exports = adminMiddlware;
