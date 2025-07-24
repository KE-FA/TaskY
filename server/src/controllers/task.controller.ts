import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const client = new PrismaClient();

//Create a Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;
    await client.task.create({
      data: { title, description, userid: id },
    });
    res.status(201).json({ message: "New Task Created successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//  Get All Tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const Tasks = await client.task.findMany({
      include: {
        users: true,
      },
    });

    // console.log(Tasks)
    res.status(200).json(Tasks);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete a Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskid } = req.params;
    await client.task.update({
      where: { taskid },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Get Task
export const getTask = async (req: Request, res: Response) => {
  try {
    const { taskid } = req.params;
    const { id } = req.user;
    const Task = await client.task.findFirst({
      where: {
        AND: [
          { taskid: taskid },
          { userid: id },
          { isDeleted: false },
          // { isCompleted: false },
        ],
      },
    });
    if (!Task) {
      res.status(404).json({ message: "Task not found or deleted" });
      return;
    }
    res.status(200).json(Task);
  } catch (e) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

//Update Task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskid } = req.params;
    const { title, description, isCompleted } = req.body;
    await client.task.update({
      where: { taskid: taskid },
      data: {
        title: title && title,
        description: description && description,
        isCompleted: isCompleted !== undefined ? isCompleted : undefined,
      },
    });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Sonething Went Wrong" });
  }
};

// Restore Deleted Task
export const restoreTask = async (req: Request, res: Response) => {
  const { taskid } = req.params;

  try {
    const updatedTask = await client.task.update({
      where: { taskid },
      data: { isDeleted: false },
    });

    res.status(200).json({ message: "Task restored", task: updatedTask });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Mark a given task as completed
export const completeTask = async (req: Request, res: Response) => {
  const { taskid } = req.params;

  try {
    const updatedTask = await client.task.update({
      where: { taskid },
      data: { isCompleted: true, isDeleted: false },
    });

    res.status(200).json(updatedTask);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Mark a given task as not completed.
export const incompleteTask = async (req: Request, res: Response) => {
  const { taskid } = req.params;

  try {
    const updatedTask = await client.task.update({
      where: { taskid },
      data: { isCompleted: false },
    });

    res
      .status(200)
      .json({ message: "Task marked as incomplete", task: updatedTask });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};


