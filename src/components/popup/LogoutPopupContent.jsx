import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";


export default function LogoutPopupContent(props) {
    const { handleClose, confirmAction } = props;
  return (
    <div>
        <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure, you want to logout?"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
            onClick={confirmAction}
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
  )
}
