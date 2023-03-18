import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import AdminPage from "./components/AdminPage";
import StudentPage from "./components/StudentPage";
import ModeratorPage from "./components/ModeratorPage";
import Registration from "./components/Registration";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
    <Router>
    <ToastContainer position='bottom-center'/>
      <Routes>
        <Route exact path="/" element={<RoleSelection />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/register" element={<Registration/>}/>
      </Routes>
    </Router>
    </div>
  );
};

export default App;
