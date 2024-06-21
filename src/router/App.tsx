import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Dashboard } from "../views/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
