import React from 'react';
import ReactLoading from 'react-loading';
import Design from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={Design.loadingScreen}>
      <div className={Design.loadingContainer}>
        <ReactLoading type={"spinningBubbles"} color={"#5B5EDB"} height={50} width={50} />
        <h1>LOADING...</h1>
      </div>
    </div>
  )
}
