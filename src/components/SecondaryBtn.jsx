import React from 'react';
import LoadingBtnSpin from "./LoadingBtnSpin";
import { PRIMARY_COLOR } from "../utils/custom/colorPalette";

export default function SecondaryBtn(props) {
    const { title, loading } = props;
    const style = {
      background: "#ffffff",
      border: "1px solid",
      borderColor: PRIMARY_COLOR,
      outline: "none",
      borderRadius: "8px",
      color: PRIMARY_COLOR,
      fontWeight: 800,
      fontSize: "12px",
      lineHeight: "12px",
      height: "40px",
      width: "fit-content",
      padding: "0 20px",
    };
    return <button style={style}><span>{title}</span></button>;
}
