import { registerUser, loginUser, updateUserPassword, logOutUser } from "../controllers/auth.controller";
import verifyUserInformation from "../middlewares/verfyUserInfo";
import checkUserNameAndEmailReuse from "../middlewares/checkEmailAndUserNameReuse";
import verifyPasswordStrength from "../middlewares/verifyPasswordStrength";
import { Router } from "express";
import verifyUser from "../middlewares/verifyUser";

const router: Router = Router();

router.post(
  "/register",
  verifyUserInformation,
  checkUserNameAndEmailReuse,
  verifyPasswordStrength,
  registerUser
);
router.post("/login", loginUser);
router.patch("/password",verifyUser, updateUserPassword )
router.post("/logout", logOutUser)

export default router;
