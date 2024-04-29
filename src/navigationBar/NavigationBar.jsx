import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import ArrowDownIcon from "../customIcons/ArrowDownIcon";
import BlogsIcon from "../customIcons/BlogsIcon";
// import logo from "../images/logo.png";
import { getAuth, signOut } from "firebase/auth";
import openMenu from "../images/openMenu.svg";
import Design from "./NavigationBar.module.css";
import Image from "../components/Image";
import NavigationLink from "./NavigationLink";
import {
  ALWAYS_OPEN,
  CLOSE_NAVBAR,
  OPEN_NAVBAR,
} from "../store/actions/navBarActions";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import {
  PRIMARY_COLOR,
  SECONDARY_TEXT_COLOR,
} from "../utils/custom/colorPalette";
import { SHOW_TOAST } from "../store/actions/toastAction";

function NavigationBar(props) {
  const auth = getAuth();
  let navigate = useNavigate();
  const profileImgurl = localStorage.getItem("profileImageUrl");
  const [dashboardColor, setDashboardColor] = useState("#212027");
  const [appoinmentsColor, setAppoinmentsColor] = useState("#212027");
  const [blogsColor, setBlogsColor] = useState("#212027");
  const [feedbacksColor, setfeedbacksColor] = useState("#212027");
  const [leafletsColor, setLeafletsColor] = useState("#212027");
  const [notificationsColor, setNotificationsColor] = useState("#212027");
  const [usersColor, setusersColor] = useState("#212027");
  const [categoryColor, setcategoryColor] = useState("#212027");
  const [resourcesColor, setResourcesColor] = useState("#212027");

  const [requestsColor, setRequestsColor] = useState("#212027");
  const [clnicsColor, setClnicsColor] = useState("#212027");
  const [logoutColor, setLogoutColor] = useState("#212027");
  const [contactsColor, setcontactsColor] = useState("#212027");
  const [productsColor, setProductsColor] = useState("#212027");
  const [height, setHeight] = useState(0);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (props.confirmAction && props.action === "logout") {
      signOut(auth)
        .then(() => {
          localStorage.clear();
          navigate(`/auth`);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          props.openSnackbar(
            "Something went wrong. Please try again later.",
            "error",
            true
          );
        });
    } else if (!props.confirmAction && !props.showPopup) {
      setLogout(false);
      setLogoutColor(SECONDARY_TEXT_COLOR);
    }
  }, [props.confirmAction, props.showPopup]);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/" && !logout) {
      navigate(`/dashboard`);
    }


    if (path.includes("/dashboard") && !logout) {
      setDashboardColor(PRIMARY_COLOR);
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    }else if (path === "/appointments" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor(PRIMARY_COLOR);
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    } else if (path === "/users" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor(PRIMARY_COLOR);
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    }else if (path === "/product" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor(PRIMARY_COLOR);
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    }  else if (path === "/blogs"  && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor(PRIMARY_COLOR);
      setBlogsColor(PRIMARY_COLOR);
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    } else if (path === "/category"  && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor(PRIMARY_COLOR);
      setBlogsColor("#212027");
      setcategoryColor(PRIMARY_COLOR);
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    } else if (path === "/feedbacks" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor(PRIMARY_COLOR);
      setClnicsColor("#212027");
      setcontactsColor("#212027");
    } else if (path === "/clinics" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor(PRIMARY_COLOR);
      setcontactsColor("#212027");
    } else if (path === "/contacts" && !logout) {
      setDashboardColor("#212027");
      setAppoinmentsColor("#212027");
      setusersColor("#212027");
      setProductsColor("#212027");
      setResourcesColor("#212027");
      setBlogsColor("#212027");
      setcategoryColor("#212027");
      setfeedbacksColor("#212027");
      setClnicsColor("#212027");
      setcontactsColor(PRIMARY_COLOR);
    } 
  }, [path, logout]);

  const onLogout = () => {
    setLogout(true);
    // setLogoutColor(PRIMARY_COLOR);
    // setNotificationsColor("#212027");
    // setDashboardColor("#212027");
    // setAppoinmentsColor("#212027");
    // setBlogsColor("#212027");
    // setLeafletsColor("#212027");
    // setfeedbacksColor("#212027");
    // setcontactsColor("#212027");

    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate(`/auth`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        props.openSnackbar(
          "Something went wrong. Please try again later.",
          "error",
          true
        );
      });
  };

  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  const handlemMediaQueryChanges = () => {
    if (mediaQuery.matches) {
      props.alwaysOpenNavbar(true, false);
    } else if (!mediaQuery.matches && !props.click) {
      props.onCloseNavBar(false, false);
    }
  };

  handlemMediaQueryChanges();
  mediaQuery.addListener(handlemMediaQueryChanges);

  const sideBar = document.querySelector(`.${Design.sideBar}`);
  if (sideBar) {
    if (props.openNavbar) {
      sideBar.style.transform = "translateX(0%)";
    } else if (props.openNavbar && props.click) {
      sideBar.style.transform = "translateX(0%)";
    } else if (!props.openNavbar && !props.click) {
      sideBar.style.transform = "translateX(-100%)";
    }
  }

  const closeNavbar = () => {
    props.onCloseNavBar(false, false);
  };

  const onDisplaySubNavBarList = () => {
    if (height === 0) {
      setHeight(125);
    } else {
      setHeight(0);
    }
  };

  return (
    <div>
      {props.click ? (
        <div className={Design.background} onClick={closeNavbar}></div>
      ) : null}
      {props.openNavbar ? (
        <div className={Design.sideBar}>
          <div className={Design.navigationBar}>
            <div className={Design.navabarLogoContainer}>
              {/* <img className={Design.logo} src={logo} alt="logo" /> */}
              {props.openNavbar && props.click ? (
                <img
                  className={Design.closeNavebarIcon}
                  src={openMenu}
                  alt="X"
                  onClick={closeNavbar}
                />
              ) : null}
            </div>
            {/* navigation links */}
            <span>
              <NavLink
                to="/dashboard"
                style={{ textDecoration: "none" }}
                onClick={closeNavbar}
              >
                <NavigationLink title={"Dashboard"} color={dashboardColor} />
              </NavLink>
              {/* {props.admin === "SUPER_ADMIN" ? ( */}
              <span>
                <NavLink
                  to="/appointments"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink
                    title={"Appointments"}
                    color={appoinmentsColor}
                  />
                </NavLink>
                <NavLink
                  to="/users"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Users"} color={usersColor} />
                </NavLink>
                <NavLink
                  to="/product"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Products"} color={productsColor} />
                </NavLink>
                <div onClick={onDisplaySubNavBarList}>
                  <div
                    className={Design.navlink}
                    style={{ backgroundColor: resourcesColor }}
                  >
                    <div className={Design.navLinkContent}>
                      <BlogsIcon color={"#fff"} />
                      <p className={Design.navlinkName}>Resources</p>
                      <ArrowDownIcon color={"#fff"} />
                    </div>
                  </div>
                </div>

                <ul
                  onClick={onDisplaySubNavBarList}
                  className={Design.navbarSublist}
                  style={{
                    height: `${height}px`,
                    visibility: height === 0 ? "hidden" : "visible",
                  }}
                >
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/blogs"
                      style={{ textDecoration: "none" }}
                    >
                      <NavigationLink title={"Blogs"} color={blogsColor} />

                      {/* <p style={{color: "#fff"}}>Blog</p> */}
                    </NavLink>
                  </li>
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/category"
                      style={{ textDecoration: "none" }}
                    >
                      <NavigationLink title={"Category"} color={categoryColor} />

                      {/* <p style={{color: "#fff"}}>Blog</p> */}
                    </NavLink>
                  </li>
                </ul>

                <NavLink
                  to="/feedbacks"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Feedbacks"} color={feedbacksColor} />
                </NavLink>

                <NavLink
                  to="/clinics"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Clinics"} color={clnicsColor} />
                </NavLink>

                <NavLink
                  to="/contacts"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Enquiries"} color={contactsColor} />
                </NavLink>

                {/* <NavLink to="/notifications" style={{ textDecoration: "none" }}>
                    <NavigationLink title={"Notifications"} color={notificationsColor} />
                  </NavLink> */}
              </span>
              {/* ) : null} */}
              <span onClick={onLogout}>
                <NavigationLink title={"Logout"} color={"#212028"} />
              </span>
            </span>

            <div style={{ height: "100px" }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
    showPopup: state.popupReducer.showPopup,
    openNavbar: state.navBarReducer.openNavbar,
    click: state.navBarReducer.click,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenNavBar: (openNavbar, click) =>
      dispatch({ type: OPEN_NAVBAR, openNavbar, click }),
    alwaysOpenNavbar: (openNavbar, click) =>
      dispatch({ type: ALWAYS_OPEN, openNavbar, click }),
    onCloseNavBar: (openNavbar, click) =>
      dispatch({ type: CLOSE_NAVBAR, openNavbar, click }),
    onOpenPopup: (showPopup, confirmAction, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, action }),
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
