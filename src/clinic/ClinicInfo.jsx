import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import Header from "../components/Header";
import Design from "./AvailableClinics.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { LOADING_SCREEN } from "../utils/constants/constants";
import LoadingScreen from "../components/LoadingScreen";

export default function ClinicInfo() {
  const { clinicId } = useParams();
  const [clinicInfo, setClinicInfo] = useState([]);
  const [days, setDays] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic/${clinicId}`)
      .then((response) => {
        setClinicInfo(response.data?.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  useEffect(() => {
    axios
    .get(`${BASE_URL}/day/clinic/${clinicId}?id=${clinicId}`)
    .then((response) => {
        setDays(response.data?.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

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
  ];

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={clinicInfo.name} />
          </div>
          <div className="topMargin">
            <div className={Design.clinicInfoContainer}>
              <div className={Design.clinicInfo}>
                <div className={Design.key}>Doctor :</div>
                <div className={Design.value}>{clinicInfo.doctor}</div>
              </div>
              <div className={Design.clinicInfo}>
                <div className={Design.key}>Contact :</div>
                <div className={Design.value}>{clinicInfo.phone}</div>
              </div>
              <div className={Design.clinicInfo}>
                <div className={Design.key}>Email :</div>
                <div className={Design.value}>{clinicInfo.email}</div>
              </div>
              <div className={Design.clinicInfo}>
                <div className={Design.key}>Location :</div>
                <div className={Design.value}>{clinicInfo.location}</div>
              </div>
              <div className={Design.clinicInfo}>
                <div className={Design.key}>Website :</div>
                <div className={Design.value}>{clinicInfo.website}</div>
              </div>
              <h4 className={Design.clinicInfoSubHeading}>Working Days</h4>
              <Table columns={columns} dataSource={days} pagination={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
