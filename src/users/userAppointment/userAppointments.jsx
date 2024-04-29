import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import AppointmentStatus from "../../appointments/AppointmentStatus";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input, Button, Space } from "antd";
import { Table } from "antd";
import Header from "../../components/Header";

import { SHOW_TOAST } from "../../store/actions/toastAction";

function UserAppointment({ openSnackbar }) {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/user/${id}`)
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },

    {
      title: "Timeslot",
      dataIndex: "timeslot",
    },
    {
      title: "Clinic",
      dataIndex: "clinic",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <AppointmentStatus status={status} />,
      filters: [
        {
          text: "Pending",
          value: 0,
        },
        {
          text: "Scheduled", // Updated from Confirmed to Scheduled, assuming "1" means scheduled
          value: 1,
        },
        {
          text: "Rejected",
          value: 2,
        },
        {
          text: "Rescheduled",
          value: 3,
        },
        {
          text: "Unavailable",
          value: 4,
        },
        {
          text: "Completed",
          value: 5,
        },
        {
          text: "Canceled",
          value: 6,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  const data = [];

  appointments.forEach((appointment) => {
    const timeslot = appointment.scheduled_slot
      ? appointment.scheduled_slot
      : "00:00";
    const rescheduledDate = appointment.scheduled_date
      ? appointment.scheduled_date
      : appointment.booking_date;
    data.push({
      key: appointment.id,
      date: rescheduledDate,
      name: appointment.user.name,
      phone: appointment.user.phone,
      email: appointment.user.username,
      status: appointment.status,
      clinic: appointment.clinic.name,
      prescriptionId: appointment.prescription_id,
      timeslot: timeslot,
    });
  });
  const handleRowClick = (record) => {
    navigate(`/users/appointment/info/${record.prescriptionId}`);
  };
  return (
    <div>
      <div className="headerSection">
        <div>
          <Header title={"Appointments"} />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClick(record),
          };
        }}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(UserAppointment);
