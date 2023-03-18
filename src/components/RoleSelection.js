import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/AuthForms.css"
const RoleSelection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate form inputs
    let valid = true;
    if (!email) {
      setEmailError("Please enter your email.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Please enter your password.");
      valid = false;
    }
    if (!role) {
      setRoleError("Please select your role.");
      valid = false;
    }
    if (valid) {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Role:", role);
    }
    else{
      toast.error("Form data is invalid");
      valid = true;
      return;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setRoleError("");
  };
  return (
    <div className="position-relative container-fluid d-flex justify-content-center align-items-center bg-image bg-opacity">
      {/* White card */}
      <div
        className="card p-4 position-absolute top-50 start-50 translate-middle"
        style={{
          width: "50vw",
          height: "70vh",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "50px",
          overflow: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img
              src={require("./logo/logo_new.png")}
              alt="Logo"
              className="mr-2"
              style={{ width: "400px", marginTop:"1rem"}}
            />
          </div>
          {/* <h3 className="text-center mb-3 discord-text">Sign In</h3> */}
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-group" style={{marginBottom:"1rem"}}>
                <label htmlFor="email" style={{marginBottom:"0.5rem"}}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group" style={{marginBottom:"1rem"}}>
                <label htmlFor="password" style={{marginBottom:"0.5rem"}}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group" style={{marginBottom:"1rem"}}>
                <label htmlFor="role" style={{marginBottom:"0.5rem"}}>Select your role:</label>
                <select
                  className="form-control"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">--Select role--</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-lg">
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div className="row mt-3" >
            <div className="col d-flex justify-content-center">
              <Link to="/register" className="btn btn-lg " style={{marginBottom:"1rem"}}>
                New user? Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
