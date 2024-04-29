import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";

function CancelPopup(props) {
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const { handleClose, confirmAction, appointmentId, openSnackbar } = props;

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/appointment/${appointmentId}`)
  //     .then((response) => {
  //       setAppointmentInfo(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const cancelAppointment = () => {
    let url;
    let data;

    if (appointmentId.status === 3) {
      url = `/appointment/rescheduled/cancel/${appointmentId.key}`;
      data = {
        status: 6,
      };
    } else if (appointmentId.status === 0) {
      url = `/appointment/pending/cancel/${appointmentId.key}`;
      data = {
        status: 6,
      };
    } else if (appointmentId.status === 1) {
      url = `/appointment/scheduled/cancel/${appointmentId.key}`;
      data = {
        status: 6,
      };
    }

    axios
      .put(`${BASE_URL}${url}`, data)
      .then((response) => {
        if (response.status === 200) {
          openSnackbar("Appointment canceled successfully", "success", true);
          setTimeout(() => {
            confirmAction();
            window.location.reload();
          }, SNACKBAR_AUTO_HIDE_DURATION);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">{"Cancel Appointment"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Do you want to cancel this appointment?"}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={cancelAppointment}
        >
          YES
        </Button>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={handleClose}
          autoFocus
        >
          NO
        </Button>
      </DialogActions>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(CancelPopup);
