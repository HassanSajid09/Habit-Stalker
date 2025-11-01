import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: { id: string };
}

const Auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const bearerHeader = req.header("Authorization");
  const token = bearerHeader?.split(" ")[1];
  console.log("Auth header:", req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: "User not authorized" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "User not authorized" });
  }
};

export default Auth;
