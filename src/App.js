import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import ModeratorPage from "./components/ModeratorPage";
import Registration from "./components/Registration";

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route exact path="/" element={<RoleSelection />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/register" element={<Registration/>}/>
      </Routes>
    </Router>
    </div>
  );
};

export default App;
