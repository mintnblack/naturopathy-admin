import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./AddAppointments.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import { toFindDayOfWeek, getCurrentDate } from "../utils/functions/convertors";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";

function AddAppointments(props) {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState([]);
  const [clinicName, setClinicName] = useState();
  const [clinicId, setClinicId] = useState();
  const [name, setName] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  const [workingDays, setWorkingDays] = useState();
  const [loading, setLoading] = useState(false);
  const [disableClinic, setdisableClinic] = useState(false);
  const [userId, setUserId] = useState()

  const [users, setUsers] = useState([]);

  const onSelectPatient = (event) =>{
    const selectedElement = document.getElementById("userList");
    const selectedOption =
      selectedElement.options[selectedElement.selectedIndex];
      setUserId(selectedOption.value);
  }


  const onSelectClinic = (event) => {
    let workingDayHtml = "Working Days: ";
    const selectedElement = document.getElementById("clinicList");
    const selectedOption =
      selectedElement.options[selectedElement.selectedIndex];
    setClinicId(selectedOption.value);
    setClinicName(selectedOption.textContent);
    setdisableClinic(true);

    axios
      .get(`${BASE_URL}/day/clinic/{clinic_id}?id=${selectedOption.value}`)
      .then((res) => {
        const data = res.data.data;
        data.map((item, index) => {
          if (data.length - 1 === index) {
            workingDayHtml += item.day;
          } else {
            workingDayHtml += item.day + ", ";
          }
        });
        setWorkingDays(workingDayHtml);
      })
      .catch((err) => console.log(err));
  };

  const onHandleValidation = () => {
    if (
      !clinicName &&
      clinicName !== "Please enter all fields" &&
      !name &&
      !appointmentDate
    ) {
      props.openSnackbar("Please enter all fields", "error", true);
      setLoading(false);
      return false;
    } else if (!clinicName && clinicName !== "Select Clinic") {
      props.openSnackbar("Please select clinic", "error", true);
      setLoading(false);
      return false;
    } else if (!userId) {
      props.openSnackbar("Please enter name", "error", true);
      setLoading(false);
      return false;
    } else if (!appointmentDate) {
      props.openSnackbar("Please enter appointment date", "error", true);
      setLoading(false);
      return false;
    } else if (appointmentDate) {
      const dayofWeek = toFindDayOfWeek(appointmentDate);
      if (!workingDays.includes(dayofWeek)) {
        props.openSnackbar(
          "Clinic is not availbale on this date ",
          "error",
          true
        );
        setLoading(false);
        return false;
      }
    }
    return true;
  };

  const onCreateAnAppointment = () => {

    console.log(userId,clinicId,appointmentDate)
    setLoading(true);
    if (onHandleValidation()) {
      const data = {
    
        clinic_id: clinicId,
        booking_date: appointmentDate,

        user_id: userId,
      };

      axios
        .post(`${BASE_URL}/appointment/`, data)
        .then((res) => {
          props.openSnackbar(
            "Appointment created successfully",
            "success",
            true
          );
          setLoading(false);
          setTimeout(() => {
            navigate("/appointments");
          }, SNACKBAR_AUTO_HIDE_DURATION);
        })
        .catch((err) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/`)
      .then((res) => {
        setUsers(res.data.data);
      
      })
      .catch((err) => console.log(err));

    axios
      .get(`${BASE_URL}/clinic/`)
      .then((res) => {
        setClinics(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="headerSection">
        <Header title={"Create Appointment"} />
      </div>
      <div className="topMargin">
        <div className={Design.addAppointmentContainer}>
          <h5>Clinic Name</h5>
          <div style={{ width: "100%" }} className="textInput">
            <select
              id="clinicList"
              className={Design.selectorInput}
              onChange={onSelectClinic}
            >
              <option value={"Select Clinic"} disabled={disableClinic}>
                Select Clinic
              </option>
              {clinics.map((clinic) => {
                return <option value={clinic.id}>{clinic.name}</option>;
              })}
            </select>
          </div>
          <div className={Design.workingDaysAndLinkContainer}>
            {workingDays ? (
              <p id="clinicWorkingDays" className={Design.workingDays}>
                {workingDays}
              </p>
            ) : null}
            {/* { appointmentLink?(
            <a href={appointmentLink}>Book appointment on clinic website</a>) : null
            } */}
          </div>
          <h5>Patient Name</h5>
          <div style={{ width: "100%" }} className="textInput">
            <select
              id="userList"
              className={Design.selectorInput}
              onChange={onSelectPatient}
            >
              <option value={"Select Clinic"} disabled={disableClinic}>
                Select Clinic
              </option>
              {users.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
            </select>
          </div>

          <h5>Appointment Date</h5>
          <div className="textInput createAppointmentDate">
            <input
              type="date"
              min={getCurrentDate()}
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>

          <span onClick={onCreateAnAppointment}>
            <PrimaryBtn title={"Create"} loading={loading} />
          </span>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(AddAppointments);
