import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const client = new PrismaClient();

//Update User Info
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress } = req.body;
    const { id } = req.user;

    await client.user.update({
      where: { id: id },
      data: { firstName, lastName, userName, emailAddress },
    });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Get user info
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;

    const user = await client.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true,
        
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};