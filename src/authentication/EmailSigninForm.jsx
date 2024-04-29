import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  emailValidator,
  passwordValidator,
} from "../utils/functions/validators";
import Design from "./EmailSigninForm.module.css";
import { ACTION_AUTH_SUCCESS } from "../store/actions/authActions";
import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingBtnSpin from "../components/LoadingBtnSpin";

function EmailSigninForm(props) {
  const { openSnackbar } = props;
  const auth = getAuth();
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    let formIsvalid = true;
    if (!email || email === "" || email === null) {
      openSnackbar("Email is required", "error", true);
      formIsvalid = false;
    } else if (!emailValidator(email)) {
      openSnackbar("Email is not valid", "error", true);
      formIsvalid = false;
    } else if (!password || password === "" || password === null) {
      openSnackbar("Password is required", "error", true);
      formIsvalid = false;
    } else if (!passwordValidator(password)) {
      openSnackbar("Password is not valid", "error", true)
      formIsvalid = false;
    }
    return formIsvalid;
  };

  const onLogin = () => {
    setLoading(true);
    if (handleValidation()) {
      localStorage.setItem("isLoggedIn", true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          props.onLoginSuccessful(
            user.accessToken,
            user.email,
            user.uid
          );
          setLoading(false);
          navigate(`/dashboard`);
          openSnackbar("Login Successful", "success", true);
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          if(errorCode === "auth/wrong-password"){
            openSnackbar("Invalid user name or password ", "error", true)
          }else if(errorCode === "auth/user-not-found"){
            openSnackbar("User not found", "error", true)
          }else if(errorCode === "auth/invalid-email"){
            openSnackbar("Email id is invalid", "error", true)
          }else if(errorCode === "auth/user-disabled"){
            openSnackbar("Your account is disabled", "error", true)
          }else if(errorCode === "auth/too-many-requests"){
            openSnackbar("Too many requests. Please try again after sometime.", "error", true)
          }else if(errorCode === "auth/operation-not-allowed"){
            openSnackbar("Operation not allowed", "error", true)
          }else if(errorCode === "auth/network-request-failed"){
            openSnackbar("Network request failed", "error", true)
          }else if(errorCode === "auth/internal-error"){
            openSnackbar("Internal error", "error", true)
          }else if(errorCode === "auth/invalid-credential"){
            openSnackbar("Invalid credential", "error", true)
          }else{
            openSnackbar("Something went wrong", "error", true)
          }
          setLoading(false);

        });
    }
  };

  return (
    <div className={Design.emailSigninPageContainer}>
      <div>
        <h2 className={Design.loginFormMainHeading}>Login into Admin panel</h2>
        <div className={Design.emailSigninForm}>
          <div className="textInput">
            <input
              style={{ width: "calc(100% - 15px)" }}
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textInput">
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={Design.loginBtn} onClick={onLogin}>
            {loading ? <LoadingBtnSpin /> : "Login"}
          </button>
          <NavLink to="/forgot-password">
          <div className={Design.forgotPasswordBtn}>
            <p>Forgot Password?</p>
          </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccessful: (authToken, email, uid) =>
      dispatch({ type: ACTION_AUTH_SUCCESS, authToken, email, uid }),
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(EmailSigninForm);
