import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { THEME } from "./utils/custom/Theme";
import { ThemeProvider } from "@mui/material/styles";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const firebaseConfig = {
  apiKey: "AIzaSyCLa3XysLd_IoRu1Kzgz5CR5QKx9dvFpFY",
  authDomain: "naturopathy-web.firebaseapp.com",
  projectId: "naturopathy-web",
  storageBucket: "naturopathy-web.appspot.com",
  messagingSenderId: "598373867898",
  appId: "1:598373867898:web:b730ab600327c96096f6c3"
};




initializeApp(firebaseConfig);
// getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

root.render(<StrictMode>{app}</StrictMode>);

reportWebVitals();
