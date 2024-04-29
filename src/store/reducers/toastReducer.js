import * as actiontypes from "../actions/toastAction";

const initialState = {
  message: "",
  severity: "",
  open: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.SHOW_TOAST:
      return {
        message: action.message,
        severity: action.severity,
        open: action.open,
      };
    case actiontypes.HIDE_TOAST:
      return {
        message: "",
        severity: "",
        open: false,
      };
    default:
      return state;
  }
};

export default toastReducer;
