import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import Design from "./clinicForm.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import { emailValidator, containsOnlyNumbers, websiteLinkValidator } from "../utils/functions/validators";

function UpdateClinicForm(props) {
  const navigate = useNavigate();
  const { clinicId } = useParams();
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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic/${clinicId}`)
      .then((response) => {
        setClinicName(response.data?.data.name);
        setClinicLocation(response.data?.data.location);
        setPhone(response.data?.data.phone);
        setDoctorName(response.data?.data.doctor);
        setWebsite(response.data.data.website);
        setEmail(response.data.data.email);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  const onSubmitAddClinicForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
    setLoading(true);
    axios
      .put(`${BASE_URL}/clinic/${clinicId}`, {
        name: clinicName,
        location: clinicLocation,
        phone: phone,
        website: website,
        doctor: doctorName
      })
      .then((response) => {
        if (response.status === 200) {
          props.openSnackbar("Clinic successfully updated", "success", true);
          setLoading(false);
          setTimeout(() => {
            navigate("/clinics");
          }, SNACKBAR_AUTO_HIDE_DURATION);
        }
      })
      .catch((error) => {
        props.openSnackbar("Something went wrong", "error", true);
        setLoading(false);
        console.log("error : ", error);
      });
    };
  };

  return (
    <div>
      <Header title={"Update Clinic Info"} />
      <div className="topMargin">
        <div className={Design.UpdateClinicContainer}>
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
          <h5>Phone</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Contact info"
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
          <h5>Location</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Location"
              value={clinicLocation}
              onChange={(e) => {
                setDoctorName(e.target.value);
              }}
            />
          </div>
          <h5>Clinic Appointment Link</h5>
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
          <div className={Design.actionButtonsContainer}>
          <span onClick={onSubmitAddClinicForm}>
            <PrimaryBtn title={"Save"} loading={loading} />
          </span>
          <NavLink to={`/add/clinic/time/${clinicId}`}>
            <SecondaryBtn title={"Add Working Days"} />
          </NavLink>
          </div>
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

export default connect(null, mapDispatchToProps)(UpdateClinicForm);
