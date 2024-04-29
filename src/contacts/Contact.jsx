import React from "react";
import { connect } from "react-redux";
import deleteIcon from "../images/dangerDelete.svg";
import Design from "./Contacts.module.css";
import { SHOW_POPUP } from "../store/actions/popUpActions";

function Contact(props) {
  const { contactInfo } = props;

  const confirmDeleteContact = () => {
    props.onOpenPopup(true, false, contactInfo.id, "delete");
  };

  return (
    <div className={Design.contactListItem}>
      <div className={Design.contactActionSection}>
      <h6 className={Design.contactName}>{contactInfo.name}</h6>
      <div className={Design.deleteContactBtn} onClick={confirmDeleteContact}>
          <img src={deleteIcon} />
        </div>
      </div>
        <div className={Design.contaceContentSection}>
          <p className={Design.contactInfo}>Email : {contactInfo.email}</p>
          <p className={Design.contactInfo}>Phone : {contactInfo.phone}</p>
          <p className={Design.contactMsg}>{contactInfo.message}</p>
        </div>
       
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

export default connect(null, mapDispatchToProps)(Contact);
