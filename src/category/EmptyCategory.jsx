import React from 'react';
import emptyImage from "../images/emptyImage.svg"
import Design from "../products/Products.module.css";

export default function EmptyCategory() {
  return (
    <div className={Design.emptyContainer}>
        <div className={Design.emptySection}>
            <img src={emptyImage} alt="emptyImage" />
            <h3>No Category</h3>
            <p>You haven't created any Category yet.</p>
        </div>
    </div>
  )
}
