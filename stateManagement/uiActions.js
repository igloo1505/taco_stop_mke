import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  TOGGLE_LEFT_TAB,
  SET_MODAL_INSTANCE,
} from "./TYPES";

export const toggleModal = () => (dispatch) => {
  if (typeof window !== "undefined") {
    dispatch({
      type: TOGGLE_MODAL,
    });
  }
};

export const toggleLeftTab = () => (dispatch) => {
  if (typeof window !== "undefined") {
    dispatch({
      type: TOGGLE_LEFT_TAB,
    });
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

export const setModalInstance = (instance) => (dispatch) => {
  dispatch({
    type: SET_MODAL_INSTANCE,
    payload: instance,
  });
};
