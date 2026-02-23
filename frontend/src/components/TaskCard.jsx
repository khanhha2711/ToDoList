import {
  Calendar,
  CheckCircle2,
  Circle,
  Delete,
  Edit,
  Trash,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
const TaskCard = ({ task, index, handleTaskChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState("");
  const handleEdit = () => {
    setIsEditing(!isEditing);
    setUpdatedTask(task.title);
  };
  const handleUpdateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, { title: updatedTask });
      toast.success("Task updated successfully");
      handleTaskChange();
    } catch (error) {
      toast.error("Error updating task: ", error);
      console.log("Error updating task");
    }
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleUpdateTask();
    }
  };
  const handleCheck = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "active" : "completed",
        completedAt:
          task.status === "completed" ? null : new Date().toISOString(),
      });
      toast.success("Task updated successfully");
      handleTaskChange();
    } catch (error) {
      toast.error("Error updating task");
      console.log("Error updating task ", error);
    }
  };
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success("Delete task successfully");
      handleTaskChange();
    } catch (error) {
      toast.error("Error delete task");
      console.log("Error ", error);
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80 "
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={handleCheck}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              autoFocus
              type="text"
              value={updatedTask}
              className="border border-border"
              onChange={(e) => setUpdatedTask(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                handleKey(e);
              }}
            />
          ) : (
            <p className={task.status === "completed" ? "line-through" : ""}>
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 pt-2">
            <Calendar size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="hidden group-hover:inline-flex animation-slide-up">
          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0 text-muted-foreground hover:text-info"
            onClick={handleEdit}
            disabled={task.status == "completed"}
          >
            <Edit />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0 text-muted-foreground hover:text-destructive"
            disabled={task.status == "completed"}
            onClick={handleDelete}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default TaskCard;
