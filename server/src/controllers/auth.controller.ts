import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

//Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
    // console.log(firstName,userName)
    // res.send("Register a new user")
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    // console.log(identifier, password)

    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: identifier }, { emailAddress: identifier }],
      },
    });

    if (!user) {
      res.status(400).json({ message: "Wrong Login Credentials" });
      return;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      res.status(400).json({ message: "Wrong Login Credentials" });
      return;
    }

    //Create jwt token
    const { password: userPassword, ...userDetails } = user;
    const token = jwt.sign(userDetails, process.env.JWT_SECRET!);
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    })
    .status(200)
    .json(userDetails);
    // res.send("Logging the user in");
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


//Change Password
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const { id  } = req.user;

    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      res
        .status(200)
        .json({ success: false, message: "Incorrect current password" });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await client.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//Logout User
export const logOutUser = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong during logout" });
  }
};
