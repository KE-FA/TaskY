import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";


const client = new PrismaClient();

//Update User Info
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, emailAddress, avatarUrl } = req.body;
    const { id } = req.user;

    await client.user.update({
      where: { id: id },
      data: { firstName, lastName, userName, emailAddress, avatarUrl },
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
        avatarUrl:true,
        
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

//Update Avatar
export const updateAvatar = async (req:Request, res:Response) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "avatars" },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}
