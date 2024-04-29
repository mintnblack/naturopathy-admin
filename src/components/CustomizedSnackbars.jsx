import React from "react";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert"; 
import { HIDE_TOAST }from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.onCloseSnackbar();
  };


  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={props.open} autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseSnackbar: () => dispatch({ type: HIDE_TOAST }),
  };
};

const mapStateToProps = (state) => {
  return {
    message: state.toastReducer.message,
    severity: state.toastReducer.severity,
    open: state.toastReducer.open,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedSnackbars);