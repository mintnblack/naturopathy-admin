import React, { useState } from "react";
import { Input } from "antd";
import Design from "./TriggerResetEmailPage.module.css";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState();

    const onResetPassword = () => {
        console.log("onResetPassword")
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
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
      </div>
      <button className={Design.resetPasswordBtn} onClick={onResetPassword}>
        Get New Password
      </button>
    </div>
  </div>
  )
}
