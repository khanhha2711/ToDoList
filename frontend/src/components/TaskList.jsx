import TaskCard from "./TaskCard";
import TaskEmptyState from "./TaskEmptyState";
const TaskList = ({ tasks, filter, handleTaskChange }) => {
  if (!tasks || tasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="flex flex-col gap-3 ">
      {tasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          index={index}
          task={task}
          handleTaskChange={handleTaskChange}
        />
      ))}
    </div>
  );
};
export default TaskList;
