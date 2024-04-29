// Example reducer.js
import { LOGOUT } from '../actions/logoutActions'; // Import your logout action type

const initialState = {
  isLoggedIn: true, // Set your initial state accordingly
};

const yourReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    // Handle other actions if needed
    default:
      return state;
  }
};

export default yourReducer;
