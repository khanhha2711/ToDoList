import express from "express";
import Task from "../model/Tasks.js";
import { startOfDay, endOfDay } from "date-fns";

export const getAllTasks = async (req, res) => {
  try {
    const { filter } = req.query;

    // 1. Kiểm tra nếu không có filter hoặc filter không hợp lệ
    let targetDate = new Date(filter);

    if (!filter || isNaN(targetDate.getTime())) {
      // Nếu không có ngày, mặc định lấy ngày hôm nay
      targetDate = new Date();
    }

    // 2. Tạo Query lọc theo createdAt trong ngày được chọn
    const query = {
      createdAt: {
        $gte: startOfDay(targetDate),
        $lte: endOfDay(targetDate),
      },
    };
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { status: 1, createdAt: 1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.log("Error fetching task", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json({ newTask });
  } catch (error) {
    console.log("Server error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Update error" });
    }
    return res.status(201).json(updatedTask);
  } catch (error) {
    console.log("Update error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Delete error" });
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log("Delete error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
