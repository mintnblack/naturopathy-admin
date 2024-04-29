import React from "react";
import { Rate } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import doneIcnon from "../images/SuccessDone.svg";
import deleteIcon from "../images/dangerDelete.svg";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { BASE_URL } from "../utils/constants/applicationConstants";
import Design from "./Feedbacks.module.css";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

function FeedbackReview(props) {
  const { review } = props;
  console.log('review',review)
  const onConfirmDeleteFeedback = () => {
    props.onOpenPopup(true, false, review.id, "delete");
  };

  const onAcceptFeedback = () => {
    axios
      .put(`${BASE_URL}/feedback/${review.id}`, {
        status: "1",
      })
      .then((response) => {
        if (response.status === 200) {
          props.openSnackbar("Feedback successfully approved", "success", true);
          setTimeout(() => {
            window.location.reload();
          }, SNACKBAR_AUTO_HIDE_DURATION);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={Design.feedbackReviewContent}>
      <div className={Design.feedbackActionSection}>
        <h6 className={Design.reviewName}>{review.name}</h6>
        {review.status == "0" ? (
          <div className={Design.feedbackActionBtnContainer}>
            <div className={Design.acceptReviewBtn} onClick={onAcceptFeedback}>
              <img src={doneIcnon} />
            </div>
            <div
              className={Design.deleteReviewBtn}
              onClick={onConfirmDeleteFeedback}
            >
              <img src={deleteIcon} />
            </div>
          </div>
        ) : (
          <div className={Design.feedbackActionBtnContainer}>
          <div
            className={Design.deleteReviewBtn}
            onClick={onConfirmDeleteFeedback}
          >
            <img src={deleteIcon} />
          </div>
        </div>
        )}
      </div>
      <div className={Design.feedbackContentConainer}>
        <p className={Design.reviewEmail}>Email: {review.email}</p>
        <p className={Design.reviewSubject}>Designation: {review.designation}</p>
        <p className={Design.reviewFeedback}>{review.feedback}</p>
        
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
    onOpenPopup: (showPopup, confirmAction, userId, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

export default connect(null, mapDispatchToProps)(FeedbackReview);
