import * as actionTypes from "../actions/popUpActions"

const initialState = {
  showPopup: false,
  confirmAction: false,
  userId: null,
  action: null,
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_POPUP:
      return {
        showPopup: action.showPopup,
        confirmAction: false,
        userId: action.userId || null,
        action: action.action || null,
      };
    case actionTypes.CONFIRM_ACTION:
      return {
        showPopup: action.showPopup,
        confirmAction: true,
        userId: state.userId || null,
        action: state.action || null,
      };
    case actionTypes.CLOSE_POPUP:
      return {
        showPopup: false,
        confirmAction: false,
        userId: null,
        action: null,
      };
    default:
      return state;
  }
};

export default popupReducer;