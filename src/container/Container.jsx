import React from 'react';
import { connect } from "react-redux";
import NavigationBar from '../navigationBar/NavigationBar';
import AppBar from "../components/AppBar";
import { Outlet, useNavigate } from "react-router-dom";
import Popup from "../components/popup/Popup";
import Design from "./Container.module.css";

function Container(props) {
  return (
    <div>
    <NavigationBar />
    <div className={Design.container}>
      <AppBar />
      <span>
      <Outlet />
      </span>
    </div>

    {props.showPopup ? <Popup open={true} /> : null}
  </div>
  )
}
const mapStateToProps = (state) => {
  return {
    showPopup: state.popupReducer.showPopup,
  };
};

export default connect(mapStateToProps, null)(Container);