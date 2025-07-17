import { Request, Response, NextFunction } from "express";

function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, emailAddress, userName, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "First name is required" });
  }
  if (!lastName) {
    res.status(400).json({ message: "Last name is required" });
  }
  if (!userName) {
    res.status(400).json({ message: "Username is required" });
  }
  if (!emailAddress) {
    res.status(400).json({ message: "Email Address is required" });
  }
  if (!password) {
    res.status(400).json({ message: "Password is required" });
  }
  next();
}

export default verifyUserInformation;
