import React, { useState, useEffect } from "react";
import { LOADING_SCREEN } from "../utils/constants/constants";
import Header from "../components/Header";
import FeedBackReviews from "./FeedBackReviews";
import LoadingScreen from "../components/LoadingScreen";

export default function Feedbacks() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  
  setTimeout(() => {
    setLoadingScreen(false);
  }
  , LOADING_SCREEN)

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Feedbacks"} />
          </div>
          <div className="topMargin">
            <div>
              <FeedBackReviews />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
