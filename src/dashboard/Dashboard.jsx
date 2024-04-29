import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { LOADING_SCREEN } from "../utils/constants/constants";
import Header from "../components/Header";
import DashboardCardContainer from "./DashboardCardContainer";
import TodayAppointments from "./TodayAppointments";
import LoadingScreen from "../components/LoadingScreen";

export default function Dashboard() {
  const [todaysTotalAppointments, setTodaysTotalAppointments] = useState();
  const [todaysClinics, setTodaysClinics] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/`)
      .then((response) => {
        const data = response.data.data;
        const todaysAppointments = data.filter((appointment) => {
          return (
            appointment.date === formattedDate &&
            (appointment.status === "confirmed" ||
              appointment.status === "rescheduled")
          );
        });
        setTodaysTotalAppointments(todaysAppointments.length);
        setTodaysAppointments(todaysAppointments);

        let todaysClinics = todaysAppointments.map((appointment) => {
          return appointment.clinic;
        });

        todaysClinics = [...new Set(todaysClinics)];
        setTodaysClinics(todaysClinics);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  setTimeout(() => {
    setLoadingScreen(false);
  }
  , LOADING_SCREEN)

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Dashboard"} />
          </div>
          <div className="topMargin">
            <div className="container">
              <DashboardCardContainer
                todaysTotalAppointments={todaysTotalAppointments}
                todaysClinics={todaysClinics}
              />

              <TodayAppointments appointments={todaysAppointments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
