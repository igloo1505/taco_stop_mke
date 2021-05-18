import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  USER_ERROR_WITH_MODAL,
} from "./TYPES";

const initialState = {
  modal: {
    modalText: "",
    modalHeader: "",
    isConfirmation: false,
  },
  errors: [],
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modal: {
          modalText: action.payload.text,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation || false,
        },
      };
    case USER_ERROR_WITH_MODAL:
      return {
        ...state,
        modal: {
          modalText: action.payload.modalText,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation,
        },
      };
    default:
      return state;
  }
}
