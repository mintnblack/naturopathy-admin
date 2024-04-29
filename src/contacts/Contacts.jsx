import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { LOADING_SCREEN } from "../utils/constants/constants";
import Header from "../components/Header";
import Contact from "./Contact";
import EmptyContactsPage from "./EmptyContactsPage";
import LoadingScreen from "../components/LoadingScreen";
import Design from "./Contacts.module.css";

function Contacts(props) {
  const { confirmAction, action, userId } = props;
  const [contacts, setContacts] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/callback/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmAction, action, userId]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/callback/`)
      .then((response) => {
        setContacts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  const contactInfo = contacts.map((contact) => {
    return <Contact key={contact.id} contactInfo={contact} />;
  });

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Enquiries"} />
          </div>
          <div className="topMargin">
            <div className="container">
              <div
                style={{ display: contactInfo.length === 0 ? "block" : "none" }}
              >
                <EmptyContactsPage />
              </div>
              <div
                className={Design.contactLists}
                style={{ display: contactInfo.length !== 0 ? "flex" : "none" }}
              >
                {contactInfo}
              </div>
            </div>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, null)(Contacts);
