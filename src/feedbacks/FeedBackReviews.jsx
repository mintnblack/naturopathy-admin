import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { Tabs } from 'antd';
import PendingReviews from "./PendingReviews";
import ApprovedReviews from "./ApprovedReviews";
import { PRIMARY_COLOR } from "../utils/custom/colorPalette";
import Design from "./Feedbacks.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

function FeedBackReviews(props) {
  const { confirmAction, action, userId } = props;
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (confirmAction && action === "delete") {
      axios
        .delete(`${BASE_URL}/feedback/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Feedback successfully deleted",
              "success",
              true
            );
            setTimeout(() => {
              window.location.reload();
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmAction, action, userId]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          width: "calc(100% - 32px)",
          bgcolor: "#F4F6F8",
          borderRadius: "16px 16px 0px 0px",
          padding: "0 16px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          allowScrollButtonsMobile
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{ sx: { backgroundColor: PRIMARY_COLOR } }}
          sx={{
            "& button": { color: "#637381" },
            "& button.Mui-selected": { color: "#212B36" },
          }}
        >
          <Tab
            key={1}
            label={"Approved Reviews"}
            sx={{ textTransform: "capitalize" }}
          />
          <Tab
            key={1}
            label={"Pending Reviews"}
            sx={{ textTransform: "capitalize" }}
          />
        </Tabs>
      </Box>

      <div role="tabpanel" style={{display: value===0 ? "block": "none"}}>
        <ApprovedReviews />
      </div>
      <div role="tabpanel" style={{display: value===1 ? "block": "none"}}>
        <PendingReviews />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackReviews);
