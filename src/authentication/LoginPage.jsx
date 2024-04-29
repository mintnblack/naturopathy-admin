import LoginBanner from "./LoginBanner";
import EmailSigninForm from "./EmailSigninForm";
import Design from "./LoginPage.module.css";
import "./loginpage.css";

export default function LoginPage() {
  return (
    <div className={Design.loginPageContainer}>
      <LoginBanner />
      <EmailSigninForm/>
    </div>
  );}
