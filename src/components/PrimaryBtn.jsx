import React from "react";
import LoadingBtnSpin from "./LoadingBtnSpin";
import { PRIMARY_COLOR } from "../utils/custom/colorPalette";

export default function PrimaryBtn(props) {
  const { title, loading } = props;
  const style = {
    background: PRIMARY_COLOR,
    border: "none",
    outline: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: 800,
    fontSize: "12px",
    lineHeight: "12px",
    height: "40px",
    width: "fit-content",
    padding: "0 20px",
  };
  return <button style={style}>{loading ? <LoadingBtnSpin/> : <span>{title}</span> }</button>;
}
