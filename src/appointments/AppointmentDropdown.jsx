import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "antd";
import threeDots from "../images/threeDots.svg";
import { SHOW_POPUP } from "../store/actions/popUpActions";

const AppointmentDropdown = (props) => {
  const { record, onOpenPopup } = props;
  console.log("record", record)
  const onScheduleAppointment = () => {
    onOpenPopup(true, false, record, "schedule");
  }

  const onRejectAppointment = () => {
    onOpenPopup(true, false, record, "decline");
  }

  const onCompleteAppointment = () => {
    onOpenPopup(true, false, record, "completed");
  }

  const onRescheduleAppointment = () => {
    onOpenPopup(true, false, record, "reschedule");
  }

  const onCancelAppointment = () => {
    onOpenPopup(true, false, record, "cancel");
  }

  const onUnavailableAppointment = () => {
    onOpenPopup(true, false, record, "unavailable");
  }

  const onDeleteAppointment = () => {
    onOpenPopup(true, false, record.key, "delete");
  };

  const items = [];

  const pendingDropdown = [
    {
      key: "1",
      label: (<span onClick={onScheduleAppointment}>Schedule</span>),
    },
    {
      key: "2",
      label: (<span onClick={onCancelAppointment}>Cancel</span>),
    },
    {
      key: "3",
      label: (<span onClick={onRejectAppointment}>Reject</span>),
    },
    {
      key: "4",
      label: (<span onClick={onDeleteAppointment}>Delete</span>),
    },
  ];

  const confirmDropdown = [
    {
      key: "1",
      label: (<span onClick={onCompleteAppointment}>Completed</span>),
    },
    {
      key: "2",
      label: (<span onClick={onRescheduleAppointment}>Reschedule</span>),
    },
    {
      key: "3",
      label: (<span onClick={onUnavailableAppointment}>Unavailabale</span>),
    },
    {
      key: "4",
      label: (<span onClick={onCancelAppointment}>Cancel</span>),
    },
    {
      key: "5",
      label: (<span onClick={onDeleteAppointment}>Delete</span>),
    },
  ];

  const rescheduleDropdown = [
    {
      key: "1",
      label: (<span onClick={onCompleteAppointment}>Completed</span>),
    },
    
    {
      key: "3",
      label: (<span onClick={onUnavailableAppointment}>Unavailabale</span>),
    },
    {
      key: "4",
      label: (<span onClick={onCancelAppointment}>Cancel</span>),
    },
    {
      key: "5",
      label: (<span onClick={onDeleteAppointment}>Delete</span>),
    },
  ];

  const unavailabaleDropdown = [
    {
      key: "1",
      label: (<span onClick={onRescheduleAppointment}>Reschedule</span>),
    },
    {
      key: "2",
      label: (<span onClick={onDeleteAppointment}>Delete</span>),
    },
  ];

  const deleteDropdown = [
    {
      key: "1",
      label: (<span onClick={onDeleteAppointment}>Delete</span>),
    },
  ];

  if (record.status == 0) {
      items.push(...pendingDropdown);
  }else if(record.status == 1){
      items.push(...confirmDropdown);
  }else if(record.status == 3){
      items.push(...rescheduleDropdown);
  }else if(record.status == 4){
      items.push(...unavailabaleDropdown);
  }else{
      items.push(...deleteDropdown);
  }

  return (
    <Dropdown
      menu={{items}}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <img src={threeDots} alt=":" />
      </a>
    </Dropdown>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

export default connect(null, mapDispatchToProps)(AppointmentDropdown);