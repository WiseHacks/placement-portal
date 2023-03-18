import React from "react";
import { Link } from "react-router-dom";
import "./styles/RoleSelection.css"
const RoleSelection = () => { 
  return (
    <div className="position-relative container-fluid d-flex justify-content-center align-items-center bg-image bg-opacity">
      {/* White card */}
      <div className="card p-4 position-absolute top-50 start-50 translate-middle" 
  style={{width:"50vw", height:"70vh", backgroundColor:"rgba(255,255,255,0.85)", borderRadius:"50px", overflow:"auto"}}>
        <div className="d-flex flex-column justify-content-center h-100">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={require("./logo/logo_new.png")} alt="Logo" className="mr-2" style={{width:"400px"}}/>
        </div>
        <h1 className="text-center mb-3 discord-text">Select Your Role</h1>
        <div className="row mt-4">
          <div className="col d-flex justify-content-center">
            <Link to="/admin"className="btn btn-lg px-5 py-3 rounded-pill" style={{width:"75%"}}>
              Admin
            </Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex justify-content-center">
            <Link to="/user" className="btn btn-lg px-5 py-3 rounded-pill" style={{width:"75%"}}>
              User
            </Link>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex justify-content-center">
            <Link to="/moderator" className="btn btn-lg px-5 py-3 rounded-pill" style={{width:"75%"}}>
              Moderator
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
