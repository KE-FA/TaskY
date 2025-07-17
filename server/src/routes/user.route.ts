import { Router } from "express";
import {
  updateUserInfo,
  getUserInfo
  
} from "../controllers/user.controller";
import verifyUser from "../middlewares/verifyUser";

const router: Router = Router();

router.get("/", verifyUser, getUserInfo)
router.patch("/", verifyUser, updateUserInfo);


export default router;
