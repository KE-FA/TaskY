import { Router } from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  getTask,
  updateTask,
  restoreTask,
  completeTask,
  incompleteTask
} from "../controllers/task.controller";

import verifyUser from "../middlewares/verifyUser";

import validateTask from "../middlewares/validateTask";

const router: Router = Router();

router.post("/", verifyUser, validateTask, createTask);
router.get("/", verifyUser, getTasks);

router.get("/:taskid", verifyUser, getTask);
router.patch("/:taskid", verifyUser, updateTask);
router.delete("/:taskid", verifyUser, deleteTask);
router.patch("/restore/:taskid", verifyUser, restoreTask);
router.patch("/complete/:taskid", verifyUser, completeTask);
router.patch("/incomplete/:taskid", verifyUser, incompleteTask);




export default router;
