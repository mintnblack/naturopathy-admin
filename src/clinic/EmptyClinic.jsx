import React from "react";
import emptyImage from "../images/emptyImage.svg";
import Design from "./AvailableClinics.module.css";

export default function EmptyClinic() {
  return (
    <div className={Design.emptyContainer}>
      <div className={Design.emptySection}>
        <img src={emptyImage} alt="emptyImage" />
        <h3>No Clinics listed here</h3>
        <p>You haven't added any clinics yet.</p>
      </div>
    </div>
  );
}
