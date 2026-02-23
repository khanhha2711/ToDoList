import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";
const TaskEmptyState = ({ filter }) => {
  return (
    <Card>
      <div className="flex flex-col items-center space-y-3 text-center">
        <Circle size="40" />
        <h3 className="font-bold">
          {filter === "all"
            ? "Chưa có nhiệm vụ"
            : filter === "active"
              ? "Chưa có nhiệm vụ nào đang làm"
              : "Chưa có nhiệm vụ nào hoàn thành"}
        </h3>
        <p className="text-muted-foreground">
          {filter === "all"
            ? "Thêm nhiệm vụ đầu tiên"
            : filter === "active"
              ? "Chuyển sang 'Tất cả' để thấy những nhiệm vụ đã hoàn thành"
              : "Chuyển sang 'Tất cả' để thấy những nhiệm vụ đang làm"}
        </p>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
