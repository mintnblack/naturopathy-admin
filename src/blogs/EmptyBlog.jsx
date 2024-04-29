import React from 'react';
import emptyImage from "../images/emptyImage.svg"
import Design from "./Blogs.module.css";

export default function EmptyBlog() {
  return (
    <div className={Design.emptyContainer}>
        <div className={Design.emptySection}>
            <img src={emptyImage} alt="emptyImage" />
            <h3>No Blogs</h3>
            <p>You haven't created any blogs yet.</p>
        </div>
    </div>
  )
}
