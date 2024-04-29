import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";
import Design from "./AvailableClinics.module.css";
import { SHOW_POPUP } from "../store/actions/popUpActions";

function AvailableClinic(props) {
  const { clinic } = props;

  const confirmDeleteClinic = () => {
    props.onOpenPopup(true, false, clinic.id, "delete");
  };

  return (
    <div className={Design.clinicsContainer}>
      <NavLink to={`/info/clinic/${clinic.id}`} className={Design.navlink}>
        <div>
          <h3>{clinic.name}</h3>
          <p>{clinic.location}</p>
        </div>
      </NavLink>
      <div className={Design.clinicInfoManageBtnsContainer}>
        <span onClick={confirmDeleteClinic}>
          <img width={20} src={deleteIcon} alt="delete" key={"delete"} />
        </span>
        <NavLink to={`/update/clinic/${clinic.id}`} className={Design.navlink}>
        <span>
          <img width={20} src={editIcon} alt="edit" key={"edit"} />
        </span>
        </NavLink>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) => dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

export default connect(null, mapDispatchToProps)(AvailableClinic);
