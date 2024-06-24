import { useEffect, useState } from "react";
import { Navbar } from "../../common/Navbar";
import { Actions, TaskList, TaskModal } from ".";
import axios from "axios";
import { Task } from "../../interface/Task";

const initialTask: Task = {
  _id: "",
  name: "",
  points: "",
  status: "",
  description: "",
  notes: "",
  __v: 0,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [modalFunction, setModalFunction] = useState("");
  const [selection, setSelection] = useState(initialTask);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Actions setOpen={setOpenTaskModal} setModalFunction={setModalFunction} />
      <TaskList
        tasks={data}
        setTasks={setData}
        loading={loading}
        open={openTaskModal}
        setOpen={setOpenTaskModal}
        modalFunction={modalFunction}
        setModalFunction={setModalFunction}
        selection={selection}
        setSelection={setSelection}
      />
      <TaskModal
        open={openTaskModal}
        setOpen={setOpenTaskModal}
        tasks={data}
        setTasks={setData}
        modalFunction={modalFunction}
        selection={selection}
      />
    </>
  );
};

export default Dashboard;
