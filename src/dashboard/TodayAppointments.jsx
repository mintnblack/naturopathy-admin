
import React from "react";
import { Table } from "antd";
import AppointmentStatus from "../appointments/AppointmentStatus";
import AppointmentDropdown from "../appointments/AppointmentDropdown";
import Design from "./Dashboard.module.css";

export default function TodayAppointments(props) {

  const { appointments } = props;

  const columns = [
    {
      title: "Timeslot",
      dataIndex: "timeslot",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
    },
    {
      title: "Insurance",
      dataIndex: "insurance",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Contact",
      dataIndex: "phone",
    },
    {
      title: "Location",
      dataIndex: "clinic",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <AppointmentStatus status={status} />,
    },
    {
      title: "",
      render: (record) => (
       <AppointmentDropdown record={record} />
      ),
  
    }
  ];

  const data = [];

  appointments.forEach((appointment) => {
    const insurance = appointment.insurance ? appointment.authorisation : "N/A";
    const timeslot  = appointment.timeslot ? appointment.timeslot : "00:00";
    data.push({
      key: appointment.id,
      date: appointment.date,
      name: appointment.name,
      insurance: insurance,
      age: appointment.age,
      gender: appointment.gender,
      phone: appointment.phone,
      clinic: appointment.clinic,
      status: appointment.status,
      timeslot: timeslot,
    });
  });

  return (
    <div className={Design.appointmentTableSection}>
        <h3>Today's Appointments</h3>
        <div className={Design.slidingTable}>
          <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}
