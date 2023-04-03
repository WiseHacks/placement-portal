import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./components/AdminPage";
import StudentPage from "./components/StudentPage";
import ModeratorPage from "./components/ModeratorPage";
import Registration from "./components/Registration";
import StudentDashboard from "./components/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";
import ModeratorDashboard from "./components/ModeratorDashboard";
const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route exact path="/" element={<RoleSelection />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/student" element={<PrivateRoute />} >
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
          <Route path="/moderator" element={<PrivateRoute />} >
            <Route path="dashboard" element={<ModeratorDashboard />} />
          </Route>
          <Route path="/admin" element={<PrivateRoute />} >
            <Route path="dashboard" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
