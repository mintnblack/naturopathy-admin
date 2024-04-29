import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import Design from "./Popup.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";

function EditExternalLink(props) {
  const { handleClose, confirmAction, linkId, openSnackbar } = props;
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
   axios.get(`${BASE_URL}/external/${linkId}`)
    .then((res) => {
      console.log(res)
      setTitle(res.data.data.title);
      setUrl(res.data.data.url);
    })
    .catch((err) => console.log(err));
  }, [])
  
  const onUpdateExternalLink = () => {
    const data = {
      "title": title,
      "url": url
    }
    axios.put(`${BASE_URL}/external/${linkId}`, data)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        openSnackbar("External link updated successfully ", "success", true);
        setTimeout(() => {
          window.location.reload();
        }, SNACKBAR_AUTO_HIDE_DURATION);
      }
      confirmAction();
      window.location.reload();
    })
    .catch((err) => console.log(err));

  };

  return (
    <div className={Design.addExternalLink}>
      <DialogTitle id="alert-dialog-title">
        {"Update an external link"}
      </DialogTitle>
      <div className={Design.addExternalLinkContentContainer}>
        <p>Title</p>
        <div className="textInput">
          <input
              className={Design.addExternalLinkInput}
              type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <p>Link</p>
        <div className="textInput">
          <input
              className={Design.addExternalLinkInput}
              type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={onUpdateExternalLink}
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

export default connect(null, mapDispatchToProps)(EditExternalLink);