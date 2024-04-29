import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "antd";
import AppointmentStatus from "./AppointmentStatus";
import AppointmentDropdown from "./AppointmentDropdown";
import ReactLoading from "react-loading";
import Design from "./Appointments.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

import { DatePicker, Input, Button, Space } from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const AppointmentTable = (props) => {
  const {
    confirmAction,
    action,
    openSnackbar,
    onOpenPopup,
    onCheckBulkDelete,
    tableLoading,
    availableClinics,
  } = props;
  const { appointments } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const clinicNameFilter = [];

  availableClinics.forEach((clinic) => {
    clinicNameFilter.push({
      text: clinic.name,
      value: clinic.name,
    });
  });

  const { RangePicker } = DatePicker;
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          autoFocus
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}  // Here we can also directly use confirm without arrow function if no additional logic is needed
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={confirm}  // Use confirm directly
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setSelectedKeys([]);  // Clear the selection keys
              clearFilters();       // Clear the filters
              confirm();            // Confirm immediately to apply the cleared filter
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    sorter: (a, b) => a[dataIndex].localeCompare(b[dataIndex]),
  });
  

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      // filterDropdown: ({
      //   setSelectedKeys,
      //   selectedKeys,
      //   confirm,
      //   clearFilters,
      // }) => (
      //   <div style={{ padding: 8 }}>
      //     <RangePicker
      //       format="YYYY-MM-DD"
      //       onChange={(dates, dateStrings) => {
      //         if (dates) {
      //           console.log("Selected Dates:", dateStrings); // Log the date strings for debugging
      //           setSelectedKeys([dateStrings]);
      //           console.log(selectedKeys);
      //           debugger;
      //           confirm();
      //         } else {
      //           clearFilters();
      //         }
      //       }}
      //       style={{ marginBottom: 8, display: "block" }}
      //     />
      //   </div>
      // ),
      // onFilter: (value, record) => {
      //   const recordDate = moment(record.date).format("YYYY-MM-DD");
      //   const startDate = moment(value[0]).format("YYYY-MM-DD");
      //   const endDate = moment(value[1]).format("YYYY-MM-DD");
      //   return recordDate >= startDate && recordDate <= endDate;
      // },
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Contact",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Timeslot",
      dataIndex: "timeslot",
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
    {
      title: "",
      render: (record) => <AppointmentDropdown record={record} />,
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
      clinic: appointment.clinic.name,
      clinic_id: appointment.clinic.id,
      status: appointment.status,
      timeslot: timeslot,
      timeslot_id: appointment.timeslot_id,
    });
  });

  const onApproveBulkdeleteRows = () => {
    onCheckBulkDelete(true);
    onOpenPopup(true, false, "delete");
  };

  useEffect(() => {
    if (confirmAction && action === "delete" && selectedRowKeys.length !== 0) {
      let data = JSON.stringify(selectedRowKeys);

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/appointment/bulk/delete/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          openSnackbar("Appointments deleted successfully", "success", true);
          setTimeout(() => {
            window.location.reload();
          }, SNACKBAR_AUTO_HIDE_DURATION);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      confirmAction &&
      action === "delete" &&
      selectedRowKeys.length === 0
    ) {
      onCheckBulkDelete(false);
    } else if (
      !confirmAction &&
      action === "delete" &&
      selectedRowKeys.length !== 0
    ) {
      onCheckBulkDelete(false);
    }
  }, [confirmAction, action]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={Design.appointmentTableContainer}>
      <div>
        {selectedRowKeys.length !== 0 ? (
          <div className={Design.selectedRowsToDelete}>
            <span className={Design.deleteRowsCount}>
              Selected rows: {selectedRowKeys.length}
            </span>
            <span>
              <button
                onClick={onApproveBulkdeleteRows}
                className={Design.deleteBtn}
              >
                Delete All
              </button>
            </span>
          </div>
        ) : null}
        <div className={Design.slidingTable}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>

      {tableLoading ? (
        <div className={Design.appointmentTableLoading}>
          <div className={Design.loadingScreen}>
            <div className={Design.loadingContainer}>
              <ReactLoading
                type={"spinningBubbles"}
                color={"#5B5EDB"}
                height={150}
                width={150}
              />
              <h1>LOADING...</h1>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
    onOpenPopup: (showPopup, confirmAction, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, action }),
  };
};

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentTable);
