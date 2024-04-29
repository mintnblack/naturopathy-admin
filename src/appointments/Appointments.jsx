import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import AppointmentTable from "./AppointmentTable";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { LOADING_SCREEN } from "../utils/constants/constants";
import LoadingScreen from "../components/LoadingScreen";
import Design from "./Appointments.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import { formatDateToDDMMYY } from "../utils/functions/convertors";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Appointments(props) {
  const { confirmAction, action, userId, openSnackbar } = props;
  const [appointments, setAppointments] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [search, setSearch] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [availableClinics, setAvailableClinics] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic/`)
      .then((response) => {
        setAvailableClinics(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSetSearchQuery = (event) => {
    if (event.key === 'Enter') {
      setTableLoading(true);
      setSearchQuery(search);
    }
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/`)
      .then((response) => {
        setAppointments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  useEffect(() => {
    if (
      props.confirmAction &&
      props.action === "delete" &&
      props.userId &&
      bulkDelete === false
    ) {
      axios
        .delete(`${BASE_URL}/appointment/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Appointment deleted successfully",
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
    let url;

    if (fromDate && toDate && searchQuery) {
      url = `appointment/search?query=${searchQuery}&first=${fromDate}&second=${toDate}`;
    } else if (!fromDate && !toDate && !searchQuery) {
      url = `appointment/`;
    } else if (fromDate && toDate && !searchQuery) {
      url = `appointment/date?first=${fromDate}&second=${toDate}`;
    } else if (!fromDate && !toDate && searchQuery) {
      url = `appointment/query?query=${searchQuery}`;
    }

    axios
      .get(`${BASE_URL}/${url}`)
      .then((response) => {
        setAppointments(response.data.data);
        setTableLoading(false);
      })
      .catch((error) => {
        setTableLoading(false);
        console.log(error);
      });
  }, [fromDate, toDate, searchQuery]);

  const handleRangeChange = (dates) => {
    if (dates === null) {
      setFromDate();
      setToDate();
    } else {
      setTableLoading(true);
      let startDate = formatDateToDDMMYY(dates[0]?.$d);
      let endDate = formatDateToDDMMYY(dates[1]?.$d);
      startDate = `${startDate.fullYear}-${startDate.month}-${startDate.day}`;
      endDate = `${endDate.fullYear}-${endDate.month}-${endDate.day}`;
      setFromDate(startDate);
      setToDate(endDate);
    }
  };

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Appointments"} />
            <span>
              <NavLink to="/create/appointment">
                <PrimaryBtn title={"+ Create New"} />
              </NavLink>
            </span>
          </div>
          <div className="topMargin">
            <div className={Design.searchAndDateContainer}>
              {/* <div className={Design.searchQuerySelector}>
                <input
                  style={{ border: "none" }}
                  className={Design.textInput}
                  type="text"
                  placeholder="Search here ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={onSetSearchQuery}
                />
                <img src={searchIcon} className={Design.searchIcon} />
              </div> */}
              <div className={Design.rangePickerContainer}>
                <RangePicker
                  stayle={{ width: "100%" }}
                  bordered={false}
                  onChange={handleRangeChange}
                />
              </div>
            </div>

            <div>
              <AppointmentTable
                tableLoading={tableLoading}
                appointments={appointments}
                availableClinics={availableClinics}
                onCheckBulkDelete={(value) => {
                  setBulkDelete(value);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
