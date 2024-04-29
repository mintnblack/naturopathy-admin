import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../components/Header";
import Design from "./AddUser.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

function EditUser({openSnackbar}) {
  const navigate = useNavigate()
  const { id } = useParams();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    axios.get(`${BASE_URL}/user/${id}`)
     .then((res) => {
       console.log(res)
       setName(res.data.data.name);
       setUsername(res.data.data.username);
       setPhone(res.data.data.phone);
      
     })
     .catch((err) => console.log(err));
   }, [])



   const onEditUser = async () => {
    if (!name  ) {
      openSnackbar("Please Enter Name", "error", true);
      setLoading(false);
      return;
    } 
  
    try {
      const response = await axios.put(`${BASE_URL}/user/${id}`, {
        name,
      });
      openSnackbar("User Edited successfully!", "success", true);
      // Consider resetting form or redirecting user here
      navigate('/users')
    } catch (error) {
      console.error("Failed to edit user:", error);
      openSnackbar(
        error.response?.data?.message || "Failed to edit user",
        "error",
        true
      );
    } finally {
      setLoading(false);
    }
  };
   const updatePassword = async () => {
    if (password !== confirmPassword) {
      openSnackbar("Password and confirm password do not match", "error", true);
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/auth/user/update_password`, {
        password,
        confirmPassword,
        username
      });
      openSnackbar("Password Updated successfully!", "success", true);
      // Consider resetting form or redirecting user here
    } catch (error) {
      console.error("Failed to Update Password:", error);
      openSnackbar(
        error.response?.data?.message || "Failed to Update Password",
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
        <Header title={"Edit User"} />
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
          <h5>Username</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder=""
              value={username}
              disabled="true"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <h5>Phone</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder=""
              value={phone}
              disabled="true"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
       <div className="mt">
       <span onClick={onEditUser}>
            <PrimaryBtn title={"Update"} loading={loading} />
          </span>
       </div>
      </div>
      {/* <div className="headerSection">
        <Header title={"Update Password"} />
      </div>
      <div className="topMargin">
        <div className={Design.addUserContainer}>
          <h5>New Password</h5>
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
          <span onClick={updatePassword}>
            <PrimaryBtn title={"Update"} loading={loading} />
          </span>
        </div>
      </div> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(EditUser);
