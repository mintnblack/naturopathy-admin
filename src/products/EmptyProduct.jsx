import React from 'react';
import emptyImage from "../images/emptyImage.svg"
import Design from "./Products.module.css";

export default function EmptyCategory() {
  return (
    <div className={Design.emptyContainer}>
        <div className={Design.emptySection}>
            <img src={emptyImage} alt="emptyImage" />
            <h3>No Products</h3>
            <p>You haven't created any Product yet.</p>
        </div>
    </div>
  )
}
