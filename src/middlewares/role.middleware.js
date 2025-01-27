module.exports.checkRole = (role) => {
  if (typeof role === "string") {
    role = [role];
  }

  return (req, res, next) => {
    if (!req.account) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not logged in.",
      });
    }
    if (role.length && !role.includes(req.account.role)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied.",
      });
    }
    next();
  };
};
