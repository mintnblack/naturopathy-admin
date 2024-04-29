import React, { useState, useEffect } from "react";
import axios from "axios";
import {BASE_URL} from "../utils/constants/applicationConstants";
import Design from "./Dashboard.module.css";

export default function DashboardCardContainer(props) {
  const {todaysTotalAppointments, todaysClinics} = props;
  const [pendingAppoinmentLength, setPendingAppoinmentLength] = useState();

  useEffect(() => {
      axios.get(`${BASE_URL}/appointment/pending`)
      .then((response) => {
        setPendingAppoinmentLength(response.data.data?.length)
      })
      .catch((error) => {
       console.log(error)
      });
  }, []);

  return (
    <div className={Design.dashboardCardContainer}>
      <div className={Design.pendingAppointmentCard}>
        <div className={Design.pendingAppointmentCardContent}>
          <h2>{pendingAppoinmentLength}</h2>
          <p>Pending Appointments</p>
        </div>
      </div>
      <div className={Design.todaysAppointments}>
        <div className={Design.todaysAppointmentsCardContent}>
          <h2>{todaysTotalAppointments}</h2>
          <p>Today's Appointments</p>
        </div>
      </div>
      <div className={Design.clinic}>
        <div className={Design.clinicCardContent}>
          <h4>Today's Clinics</h4>
          {todaysClinics.length === 0 ? <p>There are no clinics available today</p> :
          (<ul>
            {
              todaysClinics.map((clinic) => {
                return <li>{clinic}</li>
              })
            }
          </ul>)}
        </div>
      </div>
    </div>
  );
}
