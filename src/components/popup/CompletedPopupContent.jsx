import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";
import Design from "./Popup.module.css";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import PrimaryBtn from "../../components/PrimaryBtn";

function CompletedPopupContent(props) {
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [appointmentNotes, setAppointmentNotes] = useState("");
  const [products, setProducts] = useState([]);
  const [prescriptions, setPrescriptions] = useState([
    { name: "", dosage: "", url: "" },
  ]);
  const [prescriptionId, setPrescriptionId] = useState();
  const { handleClose, confirmAction, appointmentId, openSnackbar } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/${appointmentId.key}`)
      .then((response) => {
        setAppointmentInfo(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/`)
      .then((response) => {
        console.log("products", response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/${appointmentId.key}`)
      .then((response) => setAppointmentInfo(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(`${BASE_URL}/product/`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [appointmentId.key]);

  const handleAddPrescription = () => {
    setPrescriptions([...prescriptions, { name: "", dosage: "", url: "" }]);
  };

  const handleRemovePrescription = (index) => {
    const newPrescriptions = prescriptions.filter((_, idx) => idx !== index);
    if (newPrescriptions.length === 0) {
      newPrescriptions.push({ name: "", dosage: "", url: "" });  
    }
    setPrescriptions(newPrescriptions);
  };

  const handleChangePrescription = (index, field, value) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index][field] = value;
    setPrescriptions(newPrescriptions);
  };

  const onHandleValidation = () => {
    let isValid = true;
    const errorMessages = [];

    // Check if notes are empty
    if (!appointmentNotes.trim()) {
      errorMessages.push("Please enter notes.");
      isValid = false;
    }

    // Display error messages
    if (!isValid) {
      props.openSnackbar(errorMessages.join(" "), "error", true);
      setLoading(false);
    }

    return isValid;
  };

  const handleSelectProduct = (index, product) => {
    const newPrescriptions = [...prescriptions];
    newPrescriptions[index] = {
      ...newPrescriptions[index],
      name: product.name,
      url: product.url,
    };
    setPrescriptions(newPrescriptions);
  };

  const completedAppointment = () => {
    axios
      .put(`${BASE_URL}/appointment/update/${appointmentId.key}`, {
        status: 5,
        prescription_id: prescriptionId,
      })
      .then((response) => {
        if (response.status === 200) {
          openSnackbar("Appointment Completed successfully", "success", true);
          setTimeout(() => {
            confirmAction();
            window.location.reload();
          }, SNACKBAR_AUTO_HIDE_DURATION);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function createPrescription() {
    setLoading(true);
    if (!onHandleValidation()) {
      return;
    }
    const filledPrescriptions = prescriptions.filter(p => p.name.trim() && p.dosage.trim());
    const prescriptionData = {
      notes: appointmentNotes,
      products: filledPrescriptions,
    };

    axios
      .post(`${BASE_URL}/prescription/`, prescriptionData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPrescriptionId(res.data.data.id);
          console.log(prescriptionId);
          debugger;
          openSnackbar("Prescription successfully saved", "success", true);
          setTimeout(() => {}, SNACKBAR_AUTO_HIDE_DURATION);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <DialogTitle id="alert-dialog-title">
        {"Appointment Completed"}
      </DialogTitle>
      <div className={Design.rejectAppointmentRequest}>
        <div className={Design.completePopupContainer}>
          <h4>Notes</h4>
          <div className={Design.textArea}>
            <textarea
              value={appointmentNotes}
              type="text"
              rows={6}
              placeholder="Notes"
              onChange={(e) => setAppointmentNotes(e.target.value)}
            />
          </div>
        </div>
        <h4>Prescirption</h4>
        {prescriptions.map((prescription, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <Select
              value={prescription.name}
              onChange={(e) =>
                handleSelectProduct(
                  index,
                  products.find((p) => p.name === e.target.value)
                )
              }
              style={{ marginRight: 10, flex: 1 }}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.name}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Dosage"
              value={prescription.dosage}
              onChange={(e) =>
                handleChangePrescription(index, "dosage", e.target.value)
              }
              style={{ marginRight: 10, flex: 1 }}
            />
            <IconButton onClick={() => handleRemovePrescription(index)}>
              <DeleteIcon />
            </IconButton>
            {index === prescriptions.length - 1 && (
              <IconButton onClick={handleAddPrescription}>
                <AddIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>

      <span onClick={createPrescription} className={Design.rightAlign}>
        <PrimaryBtn title={"Save Prescription"} />
      </span>

      <hr className={Design.line}></hr>
      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={completedAppointment}
          disabled={!prescriptionId}
        >
          YES
        </Button>

        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={handleClose}
          autoFocus
        >
          NO
        </Button>
      </DialogActions>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(CompletedPopupContent);
