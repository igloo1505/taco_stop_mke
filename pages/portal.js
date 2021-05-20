import React, { useEffect, useState } from "react";
import styles from "../styles/Portal.module.scss";
import PortalLogin from "../components/PortalLogin";
import PortalAuthenticated from "../components/PortalAuthenticated";
import { connect } from "react-redux";
import { getAllUsers } from "../stateManagement/userActions";
import { getAllRecipes } from "../stateManagement/recipeActions";
import { GET_ALL_USERS, USER_ERROR } from "../stateManagement/TYPES";
import axios from "axios";
import ModalWithConfirmation from "../components/Modal";
import Alert from "../components/Alert";

const portal = ({
  user: {
    loggedIn,
    user: { token, _id, allUsers },
  },
  getAllUsers,
  getAllRecipes,
}) => {
  useEffect(async () => {
    await getAllRecipes();
    await getAllUsers();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    modalHeader: "",
    modalText: "",
  });
  const toggleModal = ({ modalHeader, modalText }) => {
    setModalContent({
      modalHeader: modalHeader || "",
      modalText: modalText || "",
    });
    setShowModal(!showModal);
  };
  return (
    <div className={styles.portalOuterWrapper}>
      <Alert />
      <ModalWithConfirmation
        modalText={modalContent.modalText}
        modalHeader={modalContent.modalHeader}
      />
      {loggedIn && token ? (
        <PortalAuthenticated toggleModal={toggleModal} />
      ) : (
        <PortalLogin />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getAllUsers, getAllRecipes })(portal);
