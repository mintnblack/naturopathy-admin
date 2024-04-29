import * as actionTypes from "../actions/authActions";
import { LOCAL_STORAGE_AUTH_TOKEN, LOCAL_STORAGE_EMAIL, LOCAL_STORAGE_UID } from "../../utils/constants/localStorageKeys";

const initialState = {
    authToken: localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN) ?? null,
    email: localStorage.getItem(LOCAL_STORAGE_EMAIL) ?? null,
    uid: localStorage.getItem(LOCAL_STORAGE_UID) ?? null, 
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.ACTION_AUTH_SUCCESS:
        localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, `Firebase ${action.authToken}`);
        localStorage.setItem(LOCAL_STORAGE_EMAIL, action.email);
        localStorage.setItem(LOCAL_STORAGE_UID, action.uid);
        console.log(action)
        return {
          authToken: `Firebase ${action.authToken}`,
          email: action.email,
          uid: action.uid,
        };
      case actionTypes.ACTION_NO_EXISTING_ACCOUNT:
        localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, action.tempAuthToken);
        return { ...state, authToken: action.tempAuthToken };
      default:
        return { ...state };
    }
  };
  export default authReducer;