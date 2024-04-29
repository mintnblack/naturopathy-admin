import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import Design from "./Popup.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";
import { Input, Radio, Space } from "antd";

function RejectPopupContent(props) {
  const { handleClose, confirmAction, appointmentId, openSnackbar } = props;
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [rejectReason, setrejectReason] = useState();

  const onRejectAppointmentRequest = () => {
      const data  = {
        status: 2,
        rejected_reason: rejectReason
      }

    axios
      .put(`${BASE_URL}/appointment/pending/reject/${appointmentId.key}`, data)
      .then((response) => {
        if (response.status === 200) {
          props.openSnackbar(
            "Appointment rejected successfully",
            "success",
            true
          );
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

  const onChange = (e) => {
    setrejectReason(e.target.value);
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {"Reject Appointment Request"}
      </DialogTitle>

      <div className={Design.rejectAppointmentRequest}>
        <p className={Design.reasonText}>Reason</p>

        <div className={Design.textareaContainer}>
          <Radio.Group onChange={onChange} value={rejectReason}>
            <Space direction="vertical">
              <Radio value={"1"}>Doctor Unavailable</Radio>
              <Radio value={"2"}>Slots Unavailable</Radio>
              <Radio value={"3"}>Clinic Holiday</Radio>
              <Radio value={"4"}>Duplicate Appointment</Radio>
              <Radio value={"5"}>Incorrect Patient Information</Radio>
              <Radio value={"6"}>Emergency Cancelation</Radio>
            </Space>
          </Radio.Group>
          {/* <p className={Design.reasonText}>Other</p>
          <div className={Design.otherReasonInput}>
            <input placeholder="Reason" type="text" value={otherReason} onChange={(e)=>setOtherReason(e.target.value)}/>
          </div> */}
        </div>
      </div>

      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={onRejectAppointmentRequest}
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

export default connect(null, mapDispatchToProps)(RejectPopupContent);
