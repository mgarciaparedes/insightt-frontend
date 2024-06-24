import { useEffect, useState } from "react";
import { Navbar } from "../../common/Navbar";
import { Actions, TaskList, TaskModal } from ".";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/getTaskList");
      setData(response.data);
      // console.log("response.data", response.data);
      // console.log("data", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Actions open={openTaskModal} setOpen={setOpenTaskModal} />
      <TaskList tasks={data} setTasks={setData} loading={loading} />
      <TaskModal
        open={openTaskModal}
        setOpen={setOpenTaskModal}
        tasks={data}
        setTasks={setData}
      />
    </>
  );
};

export default Dashboard;
