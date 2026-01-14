import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    // 🔑 1. Try cookie first
    let token = req.cookies?.token;

    // 🔑 2. Fallback to Authorization header (frontend friendly)
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ALWAYS attach user
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
