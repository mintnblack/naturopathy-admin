import React from 'react';
import emptyImage from "../images/emptyImage.svg";
import Design from "./Contacts.module.css";

export default function EmptyContactsPage() {
  return (
    <div className={Design.emptyReviews}>
    <div className={Design.emptyReviewsContainer}>
      <img src={emptyImage} alt="empty" />
      <h3>No Enquiries</h3>
      <p>You don't have any enquiries</p>
    </div>
  </div>
  )
}
