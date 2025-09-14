const rbac = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: "Forbidden: Not authenticated to do this operation" });
        }
        next();
    };
};

module.exports = rbac;