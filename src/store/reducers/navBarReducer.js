import * as actionTypes from "../actions/navBarActions";

const initialState = {
  openNavbar: false,
  click: false,
};

const navBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_NAVBAR:
      return {
        openNavbar: true,
        click: true,
      };
    case actionTypes.ALWAYS_OPEN:
      return {
        openNavbar: true,
        click: false,
      };
    case actionTypes.CLOSE_NAVBAR:
      return {
        openNavbar: false,
        click: false,
      };
    default:
      return state;
  }
};

export default navBarReducer;
