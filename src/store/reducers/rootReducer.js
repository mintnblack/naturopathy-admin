import { combineReducers } from "redux";
import navBarReducer from "./navBarReducer";
import popupReducer from "./popupReducer";
import toastReducer from "./toastReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    authReducer,
    navBarReducer,
    popupReducer,
    toastReducer
});

export default rootReducer;
