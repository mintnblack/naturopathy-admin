import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import PrimaryBtn from "../components/PrimaryBtn";
import Header from "../components/Header";
import Design from "./AddUser.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";

import { SHOW_TOAST } from "../store/actions/toastAction";
import {
  emailValidator,
  containsOnlyNumbers,
} from "../utils/functions/validators";
import { useNavigate } from "react-router";

function CreateUser({ openSnackbar }) {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onHandleValidation = () => {
    setLoading(true);
    if (!name || !username || !phone || !password ) {
      openSnackbar("Please fill in all fields and Confirm password correctly", "error", true);
      setLoading(false);
      return false;
    } 
    else if (password !== confirmPassword) {
      openSnackbar("Password and confirm password do not match", "error", true);
      setLoading(false);
      return false;
    } else if (!emailValidator(username)) {
      openSnackbar("Please enter a valid email for username", "error", true);
      setLoading(false);
      return false;
    } else if (!phone || phone.length > 15 || !containsOnlyNumbers(phone)) {
      openSnackbar("Please enter a valid phone number", "error", true);
      setLoading(false);
      return false;
    }
    return true; // Returns true if all validations pass
  };

  const onCreateUser = async () => {
    if (!onHandleValidation()) return;

    try {
      const response = await axios.post(`${BASE_URL}/auth/user/register/`, {
        name,
        username,
        phone,
        password,
      });
      openSnackbar("User created successfully!", "success", true);
      // Consider resetting form or redirecting user here
      navigate('/users')
    } catch (error) {
      console.error("Failed to create user:", error);
      openSnackbar(
        error.response?.data?.message || "Failed to create user",
        "error",
        true
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="headerSection">
        <Header title={"Create User"} />
      </div>
      <div className="topMargin">
      <div className={Design.addUserContainer}>
          <h5>Name</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h5>Email</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <h5>Phone Number</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <h5>Password</h5>
          <div className="textInput">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h5>Confirm Password</h5>
          <div className="textInput">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <span onClick={onCreateUser}>
            <PrimaryBtn title={"Create"} loading={loading} />
          </span>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
