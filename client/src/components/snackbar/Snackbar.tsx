import * as React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useReactiveVar } from "@apollo/client/react";
import { snackVar } from "../../constants/snack";

const Snackbar = () => {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <MUISnackbar
      open={!!snack}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {snack && (
        <Alert
          onClose={handleClose}
          severity={snack.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      )}
    </MUISnackbar>
  );
};

export default Snackbar;
