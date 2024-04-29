import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./clinicForm.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { emailValidator, containsOnlyNumbers, websiteLinkValidator } from "../utils/functions/validators";
import { useNavigate } from "react-router";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

function AddClinicForm(props) {
  const navigate = useNavigate();
  const [clinicName, setClinicName] = useState();
  const [clinicLocation, setClinicLocation] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [doctorName, setDoctorName] = useState();
  const [website, setWebsite] = useState()
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    let formIsValid = true;
    if (!clinicName) {
      formIsValid = false;
      props.openSnackbar("Clinic name is required", "error", true);
    } else if (!clinicLocation) {
      formIsValid = false;
      props.openSnackbar("Clinic location is required", "error", true);
    } else if (!phone) {
      formIsValid = false;
      props.openSnackbar("Contact info is required", "error", true);
    } else if (!containsOnlyNumbers(phone)) {
      formIsValid = false;
      props.openSnackbar(
        "Contact info should contain only numbers",
        "error",
        true
      );
    } else if (phone.length !== 10) {
      formIsValid = false;
      props.openSnackbar(
        "Contact info should contain 10 digits",
        "error",
        true
      );
    } else if (!doctorName) {
      formIsValid = false;
      props.openSnackbar("Doctor name is required", "error", true);
    } else if (!email) {
      formIsValid = false;
      props.openSnackbar("Please enter email", "error", true);
      setLoading(false);
      return false;
    } else if (!emailValidator(email)) {
      props.openSnackbar("Please enter valid email", "error", true);
      setLoading(false);
      return false;
    } else if (!website) {
      formIsValid = false;
      props.openSnackbar("Please enter clinic's website.", "error", true);
      return false;
    } else if (!websiteLinkValidator(website)){
      formIsValid = false;
      props.openSnackbar("Please enter a valid Website link", "error", true);
      return false;
    }

    return formIsValid;
  };

  const onSubmitAddClinicForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      const data = {
        "phone": phone,
        "doctor": doctorName,
        "location": clinicLocation,
        "name": clinicName,
        "website": website,
        "email": email
      };

      axios
        .post(`${BASE_URL}/clinic/`, data)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            props.openSnackbar("Clinic successfully added", "success", true);
            setTimeout(() => {
              navigate(`/clinics`);
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Header title={"Add Clinic"} />
      <div className="topMargin">
        <div className={Design.addClinicForm}>
          <h5>Name of Clinic</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Name"
              value={clinicName}
              onChange={(e) => {
                setClinicName(e.target.value);
              }}
            />
          </div>
          <h5>Location</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Location"
              value={clinicLocation}
              onChange={(e) => {
                setClinicLocation(e.target.value);
              }}
            />
          </div>
          <h5>Contact</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <h5>Email</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <h5>Doctor</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => {
                setDoctorName(e.target.value);
              }}
            />
          </div>
          <h5>Clinic Website</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Link"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
          </div>
          <span onClick={onSubmitAddClinicForm}>
            <PrimaryBtn title={"Save"} loading={loading} />
          </span>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(AddClinicForm);
