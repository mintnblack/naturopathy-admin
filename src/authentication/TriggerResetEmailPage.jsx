import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  emailValidator,
} from "../utils/functions/validators";
import Design from "./TriggerResetEmailPage.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

function TriggerResetEmailPage(props) {
  const { openSnackbar } = props;
  let navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState();

  const handleValidation = () => {
    let isFormValid = true;
    if (!email || email === "" || email === null) {
      openSnackbar("Email is required", "error", true);
      isFormValid = false;
    } else if (!emailValidator(email)) {
      openSnackbar("Email id is not valid", "error", true);
      isFormValid = false;
    }
    return isFormValid;
  };

  const triggerResetEmail = () => {
    if (handleValidation()) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          openSnackbar(
            "Password reset email sent! Please check your inbox",
            "success",
            true
          );
          setTimeout(() => {
            navigate("/auth");
          }, SNACKBAR_AUTO_HIDE_DURATION);
        })
        .catch((error) => {
          const errorCode = error.code;
          if(errorCode === 'auth/user-not-found'){
            openSnackbar("User not found", "error", true);
          }else if(errorCode === 'auth/invalid-email'){
            openSnackbar("Email id is invalid", "error", true);
          }else{
            openSnackbar("Something went wrong", "error", true);
          }
            
        });
    }
  };

  return (
    <div className={Design.formContainer}>
      <div className={Design.form}>
        <p>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </p>
        <div>
          <div className="textInput">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email id"
            />
          </div>
        </div>
        <button className={Design.resetPasswordBtn} onClick={triggerResetEmail}>
          Get New Password
        </button>
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

export default connect(null, mapDispatchToProps)(TriggerResetEmailPage);