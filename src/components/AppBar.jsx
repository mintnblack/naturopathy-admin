import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { OPEN_NAVBAR } from "../store/actions/navBarActions";
import menu from "../images/menu.svg";
import notification from "../images/notification.svg";
import Image from "./Image";
import Design from "./AppBar.module.css";

function AppBar(props) {
//   const profileImageUrl = localStorage.getItem("profileImageUrl");
  return (
    <div className={Design.appbar}>
      <img
        className={Design.menuIcon}
        src={menu}
        alt="menu"
        onClick={() => {
          props.onOpenNavBar(true, true);
        }}
      />

        {/*<div className={Design.components}>
          <NavLink to={"/notifications"}>
            <img className={Design.notificationIcon} src={notification} alt="notification" />
          </NavLink>
          <NavLink>
            <Image url={"profileImageUrl"} />
          </NavLink>
        </div> */}

    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     adminId: state.authReducer.id,
//     admin: state.authReducer.admin,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenNavBar: (openNavbar, click) => dispatch({ type: OPEN_NAVBAR, openNavbar, click }),
  };
};

export default connect(null, mapDispatchToProps)(AppBar);

