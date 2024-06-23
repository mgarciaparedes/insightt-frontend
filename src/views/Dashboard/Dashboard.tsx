import { Navbar } from "../../common/Navbar";
import { Actions, TaskList } from ".";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Actions />
      <TaskList />
    </>
  );
};

export default Dashboard;
