import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StateAndFilter from "@/components/StateAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState(new Date());
  const [page, setPage] = useState(1);
  console.log(page);
  useEffect(() => {
    fetchTask();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  const fetchTask = async () => {
    try {
      const dateParam = dateQuery ? dateQuery.toISOString() : "";
      const response = await api.get(`/tasks?filter=${dateParam}`);
      const data = response.data;
      if (data) setTaskBuffer(data.tasks);
      setActiveCount(data.activeCount);
      setCompletedCount(data.completedCount);
    } catch (error) {
      console.log("Fetch tasks error ", error);
      toast.error("Fetch tasks");
    }
  };
  const handleTaskChange = () => {
    fetchTask();
    setDateQuery(new Date());
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((page) => page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit,
  );
  const totalPage =
    filteredTask.length !== 0
      ? Math.ceil(filteredTask.length / visibleTaskLimit)
      : 1;
  if (page > totalPage) {
    handlePrev();
  }
  console.log(dateQuery)
  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 mx-auto pt-">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-4">
          <Header />
          <AddTask
            handleNewTaskAdded={handleTaskChange}
            selectedDate={dateQuery}
          />
          <StateAndFilter
            filter={filter}
            setFilter={setFilter}
            completedCount={completedCount}
            activeCount={activeCount}
          />
          <TaskList tasks={visibleTasks} handleTaskChange={handleTaskChange} />
          <div className="flex justify-between">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPage={totalPage}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
