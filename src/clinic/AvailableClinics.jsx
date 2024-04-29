import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import AvailableClinic from "./AvailableClinic";
import { NavLink } from "react-router-dom";
import Design from "./AvailableClinics.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingScreen from "../components/LoadingScreen";
import EmptyClinic from "./EmptyClinic";

function AvailableClinics(props) {
  const { confirmAction, action, userId } = props;
  const [availableClinics, setAvailableClinics] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

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

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/clinic/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Clinic successfully deleted", "success", true);
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

  const AvailableClinics = availableClinics?.map((clinic) => {
    return <AvailableClinic clinic={clinic} />;
  });

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Clinics"} />
            <span className={Design.headerBtn}>
              <NavLink to="/add/clinic">
                <PrimaryBtn title={"+ Add Clinic"} />
              </NavLink>
            </span>
          </div>
          <div className="topMargin">
            <div className="container">
              <div
                style={{
                  display: availableClinics.length === 0 ? "none" : "block",
                }}
              >
                {AvailableClinics}
              </div>
              <div
                style={{
                  display: availableClinics.length === 0 ? "block" : "none",
                }}
              >
                <EmptyClinic />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableClinics);
