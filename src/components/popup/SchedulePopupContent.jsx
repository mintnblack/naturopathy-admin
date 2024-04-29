import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import Design from "./Popup.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";

function SchedulePopupContent(props) {
  console.log("pop up props",props)
  const { handleClose, confirmAction, appointmentId, openSnackbar } = props;
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [timeSlot, setTimeSlot] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [disableTimeSlot, setdisableTimeSlot] = useState(false)

  const onSelectTimeSlot = (e) => {
    const selectedElement = document.getElementById("timeslots");
    const selectedOption =
      selectedElement.options[selectedElement.selectedIndex];
    setTimeslotId(selectedOption.value);
    setTimeSlot(selectedOption.textContent);
    setdisableTimeSlot(true);
  };

  const onHandleValidation = () => {
    if (
      timeSlot === undefined ||
      timeSlot === "" ||
      timeSlot === null ||
      timeSlot === "Select Time Slot"
    ) {
      openSnackbar("Please select a time slot", "error", true);
      return false;
    } else if (
      timeslotId === undefined ||
      timeslotId === "" ||
      timeslotId === null
      || timeslotId === "Select Time Slot"
    ) {
      openSnackbar("Please select a time slot", "error", true);
      return false;
    }
    return true;
  };

  const onScheduleAppointment = () => {
    if (onHandleValidation()) {

      const data ={
        
        status: 1,
        scheduled_slot: timeSlot,
        timeslot_id: timeslotId,
      }
      axios
        .put(`${BASE_URL}/appointment/pending/schedule/${appointmentId.key}`, data)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Appointment scheduled successfully",
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
    }
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

  useEffect(() => {
    if(appointmentInfo){
    axios
      .get(
        `${BASE_URL}/timeslot/?clinic=${appointmentId.clinic_id}&date=${appointmentId.date}`
      )
      .then((response) => {
        setTimeSlots(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [appointmentInfo]);

  return (
    <div className={Design.SchedulePopup}>
      <DialogTitle id="alert-dialog-title">
        {"Schedule an appointment"}
      </DialogTitle>
      <div className={Design.scheduledAppointment}>
        <p>Clinic Name</p>
        <h3>{appointmentId.clinic}</h3>
        <p>Appointment Date</p>
        <h3>{appointmentId.date}</h3>
        <p>Select Timeslot</p>

        <select
          className={Design.select}
          name="timeslots"
          id="timeslots"
          onChange={onSelectTimeSlot}
        >
          <option value="Select Time Slot" disabled={disableTimeSlot}>{timeSlots.length === 0? "There are no available time slots for today." : "Select Time Slot"}</option>
          {timeSlots?.map((item) => {
            if (item.status === 0) {
              return <option value={item.id}>{item.timeslot}</option>;
            }
          })}
        </select>
      </div>
      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={onScheduleAppointment}
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

export default connect(null, mapDispatchToProps)(SchedulePopupContent);
