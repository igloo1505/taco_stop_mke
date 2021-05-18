import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleModal } from "../stateManagement/uiActions";
let Modal;
const ModalWithConfirmation = ({
  modal: { modalText, modalHeader, isConfirmation, isOpen },
  toggleModal,
}) => {
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  useEffect(() => {
    handleModalOpenState();
  }, [isOpen]);
  let instance;
  if (typeof window !== "undefined") {
    Modal = require("../util/js/dist/modal");
    instance = new Modal(document.getElementById("portalModal"));
  }
  const handleModalOpenState = () => {
    if (typeof window !== "undefined") {
      if (isOpen) {
        console.log("Showing...");
        instance.show();
      }
      if (!isOpen) {
        console.log("Hiding...", instance);
        instance.hide();
      }
    }
  };

  return (
    <div
      class="modal fade"
      id="portalModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              {modalHeader}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">{modalText}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={toggleModal}
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={
                isConfirmation ? { display: "block" } : { display: "none" }
              }
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  modal: state.UI.modal,
});

export default connect(mapStateToProps, { toggleModal })(ModalWithConfirmation);
