import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
const AddTask = ({ handleNewTaskAdded, selectedDate }) => {
  const [newTask, setNewTask] = useState("");
  const AddNewTask = async () => {
    if (newTask.trim() && selectedDate >= new Date()) {
      try {
        await api.post("/tasks", { title: newTask, createdAt: selectedDate });
        toast.success("Task added successfully");
        handleNewTaskAdded();
      } catch (error) {
        toast.error("Error adding task");
        console.log("Error adding task: ", error);
      }
      setNewTask("");
    } else {
      toast.error("Task title cannot be empty");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      AddNewTask();
    }
  };
  return (
    <Card>
      <div className="flex gap-3 mx-3">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          value={newTask}
          className="h-12 text-base border bg-slate-100 focus:border-primary/50 focus:ring-primary/20"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-4"
          onClick={AddNewTask}
          disabled={!newTask.trim()}
        >
          <PlusIcon /> Thêm
        </Button>
      </div>
    </Card>
  );
};
export default AddTask;
