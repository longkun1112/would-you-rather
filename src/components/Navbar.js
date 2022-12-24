import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

const NavBar = () => {
  const { userId } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    Object.keys(users).forEach(function (key) {
      if (key === userId) {
        toast.success(`User ${users[key].name} logout`);
      }
    });
    dispatch(logout());
    localStorage.clear();
  };

  const navigateHome = () => {
    navigate('/');
    localStorage.setItem("auth", "auth");
  }

  const navigateQuestion = () => {
    navigate('/add');
    localStorage.setItem("auth", "auth");
  }

  const navigateLeaderboard = () => {
    navigate('/add');
    localStorage.setItem("auth", "auth");
  }

  return (
    <>
      <div className="navbar-container">
        <div className="nav-menu">
          <div className="nav-menu-left">
            <div className="navbar-common">
              <Link className="nav-menu-item" onClick={navigateHome} to="/">
              Home
              </Link>
            </div>
            <div className="navbar-common">
              <Link className="nav-menu-item" onClick={navigateQuestion} to="/add">
              New Question
              </Link>
            </div>
            <div className="navbar-common">
              <Link className="nav-menu-item" onClick={navigateLeaderboard} to="/leaderboard">
              Leaderboard
              </Link>
            </div>
          </div>
          <div className="navbar-center"></div>
          <div className="nav-menu-right">
            <div className="navbar-user navbar-common-right">
              <img alt="" className="nav-img" src={users[userId].avatarURL} />
              <span>Hello, {users[userId].name}</span>
            </div>
            <div
              className="navbar-common-right"
              onClick={handleLogoutUser}
            >
                <div className="nav-button-logout">
                    Logout
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
