import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Navbar, Nav, NavItem, NavLink, Container } from 'reactstrap';
import './styles/Dashboard.css';

const StudentDashboard = () => {
    const [active, setActive] = useState('profile');
    const [showNavbar, setShowNavbar] = useState(true);

    const handleNavItemClick = (item) => {
        setActive(item);
    };

    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    }

    return (
        <div className="dashboard-wrapper">
            {showNavbar && (
                <div className="sidenav">
                    <Navbar className="navbar-light">
                        <Nav vertical >
                            <NavItem className="sidenav-item">
                                <img
                                    src={require("./logo/logo_new.png")}
                                    alt="Logo"
                                    className="mr-2"
                                    style={{ width: "200px", marginTop: "1rem", marginBottom: "3rem" }}
                                />
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('profile')}
                                    className={active === 'profile' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('jobopenings')}
                                    className={active === 'jobopenings' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    Job openings
                                </NavLink>
                            </NavItem>

                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('applications')}
                                    className={active === 'applications' ? 'active' : ''}
                                >
                                    <i className="far fa-file-alt fa-lg mr-3"></i>
                                    My Applications
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('myresume')}
                                    className={active === 'myresume' ? 'active' : ''}
                                >
                                    <i className="far fa-user-circle fa-lg mr-3"></i>
                                    My Resume
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item">
                                <NavLink
                                    href="#"
                                    onClick={() => handleNavItemClick('placementstatus')}
                                    className={active === 'placementstatus' ? 'active' : ''}
                                >
                                    <i className="fas fa-cog fa-lg mr-3"></i>
                                    Placement Status
                                </NavLink>
                            </NavItem>
                            <NavItem className="sidenav-item mt-auto">
                                <NavLink href="#" onClick={() => alert('Confirm Sign-out?')}>
                                    <i className="fas fa-sign-out-alt fa-lg mr-3"></i>
                                    Sign out
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            )}

            <div className="content-wrapper">
                {active === 'profile' && (
                    <div>
                        <h1>Profile</h1>
                        <p>Name: John Doe</p>
                        <p>Email: john.doe@example.com</p>
                        <p>Phone Number: +1 555-1234</p>
                    </div>
                )}
                {active === 'jobopenings' && (
                    <div>
                        <h1>Job Posts</h1>
                        <p>There is no job post yet.</p>
                    </div>
                )}
                {active === 'applications' && (
                    <div>
                        <h1>Applications</h1>
                        <p>You have no applications.</p>
                    </div>
                )}
                {active === 'myresume' && (
                    <div>
                        <h1>My resume</h1>
                        <p>You have no resume saved.</p>
                    </div>
                )}
                {active === 'placementstatus' && (
                    <div>
                        <h1>Placement Status</h1>
                        <p>All placed</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
