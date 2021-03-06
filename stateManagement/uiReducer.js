import {
  TOGGLE_MODAL,
  RECIPE_ERROR,
  TRIGGER_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  ERROR_WITH_MODAL,
  TOGGLE_LEFT_TAB,
  TOGGLE_EDIT_STATE,
  UPDATE_USER_INFO,
  EDIT_MENU_ITEM,
  SET_MODAL_INSTANCE,
  TRIGGER_ALERT,
  DISPOSE_ALERT,
  AUTHENTICATION_ERROR,
  SET_VIEWPORT_DIMENSIONS,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  USER_ERROR,
  USER_ERROR_WITH_DIALOGUE,
  REMOVE_USER,
} from "./TYPES";

const initialState = {
  modal: {
    instance: {},
    modalText: "",
    modalHeader: "",
    isConfirmation: false,
    isOpen: false,
    wasDismissed: false,
    wasAccepted: false,
  },
  alert: {
    alertText: "",
    alertType: "",
    isOpen: false,
  },
  viewport: {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isXL: false,
    width: null,
    height: null,
  },
  leftTab: {
    isOpen: true,
  },
  isEditing: false,
  errors: [],
};
const upperLimits = {
  mobile: 850,
  tablet: 1350,
  desktop: 1650,
  XL: 2400,
};
const getDeviceType = (w) => {
  console.log("Wwwww", w);
  switch (true) {
    case w <= upperLimits.mobile:
      return "isMobile";
    case w <= upperLimits.tablet:
      return "isTablet";
    case w <= upperLimits.desktop:
      return "isDesktop";
    case w >= upperLimits.desktop:
      return "isXL";
    default:
      return null;
  }
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalText: action.payload.text,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation || false,
          wasDismissed: false,
          wasAccepted: false,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };
    case SET_VIEWPORT_DIMENSIONS:
      let device = getDeviceType(action.payload.width);
      console.log("Device type", device);
      return {
        ...state,
        modal: { ...state.modal },
        alert: { ...state.alert },
        viewport: {
          width: action.payload.width,
          height: action.payload.height,
          isMobile: device === "isMobile" ? true : false,
          isTablet: device === "isTablet" ? true : false,
          isDesktop: device === "isDesktop" ? true : false,
          isXL: device === "isXL" ? true : false,
        },
        leftTab: { ...state.leftTab },
      };
    case TRIGGER_ALERT:
      return {
        ...state,
        modal: { ...state.modal },
        leftTab: { ...state.leftTab },
        alert: action.payload,
      };
    case DISPOSE_ALERT:
      return {
        ...state,
        modal: { ...state.modal },
        leftTab: { ...state.leftTab },
        alert: initialState.alert,
      };
    case SET_MODAL_INSTANCE:
      return {
        ...state,
        modal: {
          ...state.modal,
          instance: action.payload,
          wasDismissed: false,
          wasAccepted: false,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };
    case MODAL_DISMISSED:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: false,
          wasDismissed: true,
          wasAccepted: false,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };
    case MODAL_CONFIRMED:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: false,
          wasDismissed: false,
          wasAccepted: true,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };

    case UPDATE_USER_INFO:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "User was updated successfully",
          alertType: "success",
          isOpen: true,
        },
        isEditing: !state.isEditing,
      };
    case EDIT_MENU_ITEM:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "Recipe was updated successfully",
          alertType: "success",
          isOpen: true,
        },
        isEditing: !state.isEditing,
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "There was an error logging in.",
          alertType: "danger",
          isOpen: true,
        },
        isEditing: false,
      };
    case USER_ERROR:
    case RECIPE_ERROR:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "An error occurred.",
          alertType: "danger",
          isOpen: true,
        },
        isEditing: false,
      };

    case REGISTER_NEW_USER:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "Success.",
          alertType: "success",
          isOpen: true,
        },
        isEditing: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: {
          alertText: "User was removed.",
          alertType: "success",
          isOpen: true,
        },
        isEditing: false,
      };

    case TOGGLE_EDIT_STATE:
      return {
        ...state,
        modal: { ...state.modal },
        letTab: { ...state.leftTab },
        alert: { ...state.alert },
        isEditing: !state.isEditing,
      };
    case TOGGLE_LEFT_TAB:
      return {
        ...state,
        modal: { ...state.modal },
        alert: { ...state.alert },
        leftTab: {
          isOpen: !state.leftTab.isOpen,
        },
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: !state.modal.isOpen,
          wasDismissed: false,
          wasAccepted: false,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };
    case TRIGGER_MODAL:
    case ERROR_WITH_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          modalText: action.payload.modalText,
          modalHeader: action.payload.modalHeader,
          isConfirmation: action.payload.isConfirmation,
          isOpen: action.payload.isOpen || true,
          wasDismissed: false,
          wasAccepted: false,
        },
        alert: { ...state.alert },
        leftTab: { ...state.leftTab },
      };
    default:
      return state;
  }
}
