import React from "react";
import emptyImage from "../images/emptyImage.svg";
import Design from "./Feedbacks.module.css";

export default function EmptyReviews(props) {
  const { title, description } = props;
  return (
    <div className={Design.emptyReviews}>
      <div className={Design.emptyReviewsContainer}>
        <img src={emptyImage} alt="empty" />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
