import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "antd";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import Design from "./clinicForm.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { useParams, NavLink } from "react-router-dom";
import dangerDelete from "../images/dangerDelete.svg";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "antd";
dayjs.extend(customParseFormat);

function AddClinicTime(props) {
  const { confirmAction, action, userId } = props;
  const { clinicId } = useParams();
  const [clinicData, setClinicData] = useState([]);
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [gap, setGap] = useState();
  const [availableDays, setAvailableDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableWorkingDays, setAvailableWorkingDays] = useState([]);

  const workingDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/day/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Clinic timeslot deleted successfully",
              "success",
              true
            );
            setTimeout(() => {
              window.location.reload();
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmAction, action, userId]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic/${clinicId}`)
      .then((response) => {
        setClinicData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAvailableDays = () => {
    axios
      .get(`${BASE_URL}/day/clinic/${clinicId}?id=${clinicId}`)
      .then((response) => {
        const data = response.data?.data;
        const availableWorkingDays = workingDays.filter((day) => {
          return !data.some((item) => item.day === day);
        });
        setAvailableWorkingDays(availableWorkingDays);
        setAvailableDays(response.data?.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  useEffect(() => {
    getAvailableDays();
  }, []);

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Start Time",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "End Time",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Duration",
      dataIndex: "gap",
      key: "gap",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <img
          src={dangerDelete}
          onClick={() => {
            props.onOpenPopup(true, false, id, "delete");
          }}
          alt="Delete"
        />
      ),
    },
  ];

  const handleValidation = () => {
    if (!day || day === "") {
      props.openSnackbar("Select a clinic name", "error", true);
      setLoading(false);
      return false;
    } else if (!startTime || startTime === "") {
      props.openSnackbar("Select a start time", "error", true);
      setLoading(false);
      return false;
    } else if (!endTime || endTime === "") {
      props.openSnackbar("Select a end time", "error", true);
      setLoading(false);
      return false;
    } else if (!gap || gap === "") {
      props.openSnackbar("Select a gap", "error", true);
      setLoading(false);
      return false;
    }
    return true;
  };

  const onAddTimeSlot = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const data = {
        day: day,
        start: startTime,
        end: endTime,
        gap: parseInt(gap),
        clinic_id: clinicId,
      };

      axios
        .post(`${BASE_URL}/day/`, data)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Clinic timeslot added successfully",
              "success",
              true
            );
            setLoading(false);
            getAvailableDays();
          }
        })
        .catch((error) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log("error : ", error);
        });
    }
  };

  return (
    <div>
      <Header title={"Add Clinic"} />
      <div className="topMargin">
        <div className={Design.displayClinicDataSection}>
          <div className={Design.clinicDataRow}>
            <div className={Design.clinicDataRowKey}>Clinic Name :</div>
            <div className={Design.clinicDataRowValue}>{clinicData.name}</div>
          </div>
          <div className={Design.clinicDataRow}>
            <div className={Design.clinicDataRowKey}>Doctor's Name :</div>
            <div className={Design.clinicDataRowValue}>{clinicData.doctor}</div>
          </div>
          <div className={Design.clinicDataRow}>
            <div className={Design.clinicDataRowKey}>Location :</div>
            <div className={Design.clinicDataRowValue}>
              {clinicData.location}
            </div>
          </div>
          <div className={Design.clinicDataRow}>
            <div className={Design.clinicDataRowKey}>Conatact Info :</div>
            <div className={Design.clinicDataRowValue}>
              {clinicData.contact}
            </div>
          </div>
        </div>

        <h4 className={Design.clinicInfoSubHeading}>Working Days</h4>
        <Table
          columns={columns}
          dataSource={availableDays}
          pagination={false}
        />

        <div
          style={{
            display: availableWorkingDays.length === 0 ? "none" : "block",
          }}
        >
          <h4>Add Clinic Time</h4>
          <div className={Design.addClinicTimeSlotForm}>
            <span>Day</span>
            <div className={Design.addClinicTimeSlotFormInputConatinerSelect}>
              <select
                className={Design.selectDay}
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="">Select Day</option>
                {availableWorkingDays.map((day) => {
                  return <option value={day}>{day}</option>;
                })}
              </select>
            </div>
            <span>Consultation starting time</span>

            <TimePicker
              className={Design.addClinicTimeSlotFormInputConatinerSelect}
              onChange={(time, timeString) => setStartTime(timeString)}
              format="HH:mm"
            />

            <span>Consultation ending time</span>

            <TimePicker
              className={Design.addClinicTimeSlotFormInputConatinerSelect}
              onChange={(time, timeString) => setEndTime(timeString)}
              format="HH:mm"
            />

            <span>Duration of consultation</span>
            <div className={Design.addClinicTimeSlotFormInputConatiner}>
              <input
                type="text"
                value={gap}
                onChange={(e) => setGap(e.target.value)}
                placeholder="Duration in minutes"
              />
            </div>
            <div className={Design.actionButtonsContainer}>
              <span onClick={onAddTimeSlot}>
                <PrimaryBtn title="Add Time Slot" loading={loading} />
              </span>
              <NavLink to={"/clinics"}>
                <SecondaryBtn title="Cancel" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
    onOpenPopup: (showPopup, confirmAction, userId, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClinicTime);
