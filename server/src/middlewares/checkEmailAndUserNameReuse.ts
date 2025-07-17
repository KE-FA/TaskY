import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

async function checkUserNameAndEmailReuse(req:Request, res:Response, next:NextFunction){
     const{userName, emailAddress} = req.body
     const userWithUsername = await client.user.findFirst({where:{userName}})
     if(userWithUsername){
        res.status(400).json({message:"Username is already in use"})
        return;
     }

     const userWithEmail = await client.user.findFirst({where:{emailAddress}})
     if(userWithEmail){
        res.status(400).json({message:"EmailAddress is already in use"})
        return;
     }
     next();
}

export default checkUserNameAndEmailReuse