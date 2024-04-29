import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";
import FeedbackReview from "./FeedbackReview";
import EmptyReviews from "./EmptyReviews";

export default function ApprovedReviews() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/feedback/approved/`)
      .then((response) => {
        setFeedbacks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const feedback = feedbacks.map((review) => {
    return <FeedbackReview review={review} />;
  });

  return (
    <div>
      <div style={{ display: feedbacks.length === 0 ? "block" : "none" }}>
      <EmptyReviews title={"No Approved Reviews"} description ={"You don't have any approved reviews"} />
      </div>
      <div style={{ display: feedbacks.length !== 0 ? "block" : "none" }}>
        {feedback}
      </div>
    </div>
  );
}
