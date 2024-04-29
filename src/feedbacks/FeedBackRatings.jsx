import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Progress } from "antd";
import { PRIMARY_COLOR } from "../utils/custom/colorPalette";
import {BASE_URL} from "../utils/constants/applicationConstants";
import star from "../images/star.svg";
import Design from "./Feedbacks.module.css";

export default function FeedBackRatings() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/feedback/approved/`)
      .then((response) => {
        setFeedbacks(response.data.data)
      })
      .catch((error) => {
       console.log(error)
      });
  }, []);

  return (
    <div className={Design.FeedBackRatings}>
      <div className={Design.totalRatingsContainer}>
        <p className={Design.totalReverageReview}>4.0</p>
        <p className={Design.totalReviewsRatingsNumber}>245 Ratings</p>
        <p className={Design.totalReviewsRatingsNumber}>150 Reviews</p>
      </div>

      <div className={Design.ratingProgressBarContainer}>
        <div className={Design.ratingProgresbar}>
          <span>5</span>
          <img src={star} alt="*" />
          <Progress strokeColor={PRIMARY_COLOR} percent={30} />
        </div>
        <div className={Design.ratingProgresbar}>
          <span>4</span>
          <img src={star} alt="*" />
          <Progress strokeColor={PRIMARY_COLOR} percent={30} />
        </div>
        <div className={Design.ratingProgresbar}>
          <span>3</span>
          <img src={star} alt="*" />
          <Progress strokeColor={PRIMARY_COLOR} percent={30} />
        </div>
        <div className={Design.ratingProgresbar}>
          <span>2</span>
          <img src={star} alt="*" />
          <Progress strokeColor={PRIMARY_COLOR} percent={30} />
        </div>
        <div className={Design.ratingProgresbar}>
          <span>1</span>
          <img src={star} alt="*" />
          <Progress strokeColor={PRIMARY_COLOR} percent={30} />
        </div>
      </div>
    </div>
  );
}
