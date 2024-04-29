import React, { useEffect, useState } from "react";
// import axios from "axios";
// import searchIcon from "../images/searchIcon.svg";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
// // import AppointmentTable from "./AppointmentTable";
// import { BASE_URL } from "../utils/constants/applicationConstants";
import { LOADING_SCREEN } from "../utils/constants/constants";
import LoadingScreen from "../components/LoadingScreen";
// // import Design from "./Appointments.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
// import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
// import { formatDateToDDMMYY } from "../utils/functions/convertors";
import moment from "moment";
import { DatePicker } from "antd";
import UsersTable from "./UsersTable";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";

const { RangePicker } = DatePicker;

function Appointments(props) {

  const { confirmAction, action, userId, openSnackbar } = props;
  const [appointments, setAppointments] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [search, setSearch] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [tableLoading, setTableLoading] = useState(false);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [availableClinics, setAvailableClinics] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingScreen, setLoadingScreen] = useState(true);
  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <div >
              <Header title={"Users"} />
            </div>
            <span>
              <NavLink to="/users/create">
                <PrimaryBtn title={"+ Create New"} />
              </NavLink>
            </span>
          </div>

          <div>
            <UsersTable tableLoading={tableLoading} users={users} />
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
