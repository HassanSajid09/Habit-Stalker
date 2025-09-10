import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/users";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;
  const avatar = `https://api.dicebear.com/7.x/adventurer/png?seed=${name}`;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User Already Exists" });
      return;
    }

    const newUser = new User({ name, email, password, avatar });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error" });
          return;
        }

        res.status(200).json({
          message: "User Registered Successfully",
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
    console.log("Error:", err);
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) {
          res.status(500).json({ message: "Internal Sever Error" });
          return;
        }

        res
          .status(200)
          .json({ message: "User Authorized Successfully", token });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error : ", err);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error:", err);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error:", err);
  }
};

export const delUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user?.id);

    if (!deletedUser) {
      res.status(400).json({ message: "User not Found" });
      return;
    }
    res.json({ message: "User deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
    console.log("Error:", err);
  }
};
