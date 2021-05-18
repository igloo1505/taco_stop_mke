import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
} from "./TYPES";

export const toggleModal = () => {
  if (typeof window !== "undefined") {
    Modal = require("../util/js/dist/modal");
    console.log(Modal);
    const modal = new Modal(document.getElementById("portalModal"));
    modal.toggle();
  }
};

export const setModalContent =
  ({ modalHeader, modalText, isConfirmation }) =>
  async (dispatch) => {
    dispatch({
      type: SET_MODAL_CONTENT,
      payload: { modalHeader, modalText, isConfirmation },
    });
  };
