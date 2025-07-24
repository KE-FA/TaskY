import { Router } from "express";
import {
  updateUserInfo,
  getUserInfo,
  updateAvatar
  
} from "../controllers/user.controller";
import verifyUser from "../middlewares/verifyUser";

const router: Router = Router();

router.get("/", verifyUser, getUserInfo)
router.patch("/", verifyUser, updateUserInfo);
router.post("/avatar", verifyUser, updateAvatar)


export default router;
