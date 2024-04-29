import React from "react";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { CLOSE_POPUP, CONFIRM_ACTION } from "../../store/actions/popUpActions";

import LogoutPopupContent from "./LogoutPopupContent";
import DeletePopupContent from "./DeletePopupContent";
import RejectPopupContent from "./RejectPopupContent";
import SchedulePopupContent from "./SchedulePopupContent";
import ReschedulePopupContent from "./ReschedulePopupContent";
import UnavailablePopupContent from "./UnavailablePopupContent";
import CompletedPopupContent from "./CompletedPopupContent";
import CancelPopup from "./CancelPopup";
import AddExternalLink from "./AddExternalLink";
import EditExternalLink from "./EditExternalLink";

function Popup(props) {

  const handleClose = () => {
    props.onClosePopup(false, false);
  };

  const confirmAction = () => {
    props.onConfirmAction(false, true);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.action === "logout"
        ?(<LogoutPopupContent handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
         {props.action === "delete"
        ?(<DeletePopupContent handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "decline"
          ?(<RejectPopupContent appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "schedule"
          ?(<SchedulePopupContent appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "reschedule"
          ?(<ReschedulePopupContent appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "unavailable"
          ?(<UnavailablePopupContent appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }{
          props.action === "completed"
          ?(<CompletedPopupContent appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }{
          props.action === "cancel"
          ?(<CancelPopup appointmentId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "add_link"
          ?(<AddExternalLink handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
        {
          props.action === "edit_link"
          ?(<EditExternalLink linkId={props.userId} handleClose={()=>handleClose()} confirmAction={()=>confirmAction()}/>) : null
        }
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClosePopup: (showPopup, confirmAction) =>
      dispatch({ type: CLOSE_POPUP, showPopup, confirmAction }),
    onConfirmAction: (showPopup, confirmAction) =>
      dispatch({ type: CONFIRM_ACTION, showPopup, confirmAction }),
  };
};

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    userId: state.popupReducer.userId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);