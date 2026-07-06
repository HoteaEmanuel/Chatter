import { SnackMessage } from "../interfaces/snack-message.interface";

const UNKNOWN_ERROR_OCCURED =
  "An unknown error has occured. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_OCCURED,
  type: "error",
};

export { UNKNOWN_ERROR_OCCURED, UNKNOWN_ERROR_SNACK_MESSAGE };
