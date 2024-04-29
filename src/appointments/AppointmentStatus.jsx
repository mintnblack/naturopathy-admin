import React from 'react';
import { Tag } from 'antd';
const statusMapping = {
  0: "pending",
  1: "scheduled",
  2: "rejected",
  3: "rescheduled",
  4: "unavailable",
  5: "completed",
  6: "canceled",
};
export default function AppointmentStatus(props) {
  let color;
  if(props.status == 0) {
    color = "gold";
  }else if(props.status == 1) {
    color = "green";
  }else if(props.status == 6) {
    color = "volcano";
  }else if (props.status == 5) {
    color = "blue";
  }else if (props.status == 3) {
    color = "geekblue";
  }else if (props.status == 2) {
    color = "red";
  }else if (props.status == 4) {
    color = "purple";
  }
  return (
    <Tag style={{textTransform: "uppercase"}} color={color}>{statusMapping[props.status]}</Tag>
  )
}
