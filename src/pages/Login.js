import React, { useState } from "react";
import {
  Form,
  FormDropdown,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../store/authSlice";
import { mapValues } from "lodash";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [userId, setUserId] = useState("");
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDisabledButton = userId === "";

  const renderSignInOptions = () => {
    const signInOptionsList = [];

    mapValues(users, (user) => {
      signInOptionsList.push({
        key: user.id,
        text: user.name,
        value: user.id,
        image: { avatar: false, src: user.avatarURL },
      });
    });
    console.log(users);

    return signInOptionsList;
  };

  const handleSelectUser = (e, { value }) => {
    setUserId(value);
  };

  const handleSignInUser = () => {
    Object.keys(users).forEach(function (key) {
      if (key === userId) {
        toast.success(`${users[key].name} login successfully`);
      }
    });
    dispatch(authUser(userId));
    const location = localStorage.getItem('location')
    if(location) {
      navigate(location);
    } else {
      navigate("/");
    }
    localStorage.setItem("auth", "auth");
  };

  return (
    <div className="container">
      <div className="contentContainer">
        <div className="headerContainer">
          <h2 style={{ color: "#a333c8" }}>
            Welcome to Would You Rather game!
          </h2>
          <h3 className="subHeader">Please sign in to continue</h3>
        </div>
          <div className="img-grid">
             <div className="img-grid-column">
              <img className="login-logo" alt="" src="/assets/logo.svg" />
            </div>
          </div>

        <h1 style={{ color: "#21ba45" }}>Login</h1>

        <div className="formContainer">
          <Form>
            <FormDropdown
              placeholder="Select User"
              selection
              scrolling
              required
              fluid
              options={renderSignInOptions()}
              value={userId}
              onChange={handleSelectUser}
            />
            { 
                isDisabledButton ? 
                (
                  <div className="not-submmit-login-button">
                      Login
                  </div>
                ) : (
                  <div className="login-button" onClick={handleSignInUser}>
                      Login
                  </div>
                )
              }
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
