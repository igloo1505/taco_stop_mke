import React, { useState, useEffect } from "react";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
import FormInput from "./FormInput";
import { data, submissionHandler } from "./dataForForm";
import { connect } from "react-redux";
import { addNewUser, getAllUsers } from "../stateManagement/userActions";
import { toggleLeftTab } from "../stateManagement/uiActions";
import ItemDisplaySection from "./cmsItemSection/ItemDisplaySection";
import { FcNext } from "react-icons/fc";
import {
  RETURN_SINGLE_ITEM,
  TOGGLE_EDIT_STATE,
} from "../stateManagement/TYPES";
import { useDispatch } from "react-redux";

const PortalAuthenticated = ({
  user,
  UI: {
    leftTab: { isOpen },
    isEditing,
  },
  props: { toggleModal },
  addNewUser,
  toggleLeftTab,
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(data.categories[0]);
  const [selectedItem, setSelectedItem] = useState({});
  const initialFormData = {
    User: {
      ["First Name"]: "",
      ["Last Name"]: "",
      Username: "",
      Password: "",
      ["Confirm Password"]: "",
    },
    Recipes: { ["In Stock"]: false, ["Gluten Free"]: false, ["Spicy"]: false },
  };
  const [formData, setFormData] = useState(initialFormData);
  const [dataArray, setDataArray] = useState([]);

  const setData = () => {
    if (selected.name === "User") {
      if (isEditing) {
        return setDataArray(user.filtered);
      } else {
        return setDataArray(user.allUsers);
      }
    }
    if (selected.name === "Recipes") {
      setDataArray([]);
    }
  };

  const handleEditState = (obj) => {
    console.log("Did trigger edit state function with: ", obj);
    setSelectedItem(obj ? obj : {});
    if (selected.name === "User") {
      dispatch({
        type: RETURN_SINGLE_ITEM,
        payload: { _id: obj._id },
      });
      // setIsEditing(!isEditing);
      dispatch({ type: TOGGLE_EDIT_STATE });
      setFormData({
        Recipes: { ...formData.Recipes },
        User: {
          ["First Name"]: obj.firstName,
          ["Last Name"]: obj.lastName,
          Username: obj.userName,
          Password: obj.password,
          ["Confirm Password"]: "",
        },
      });
    }
  };

  const cancelEditState = () => {
    dispatch({
      type: TOGGLE_EDIT_STATE,
    });
    setFormData(initialFormData);
  };

  useEffect(() => {
    setData();
  }, [selected.name, user, isEditing]);

  const setSelectedCategory = (category) => {
    let filtered = data.categories.filter((d) => d.name === category);
    // setFormData({});
    // setIsEditing(false);
    if (isEditing === true) {
      dispatch({ type: TOGGLE_EDIT_STATE });
    }
    setSelected(filtered[0]);
  };
  const handleSubmission = async (e) => {
    if (selected.name === "User" && !isEditing) {
      let x = await addNewUser(formData[selected.name]);
      console.log(x);
      if (x) {
        switch (selected.name) {
          case "User":
            setFormData({
              User: {
                ["First Name"]: "",
                ["Last Name"]: "",
                Username: "",
                Password: "",
                ["Confirm Password"]: "",
              },
              Recipes: { ...formData.Recipes },
            });
        }
      }
    }
  };

  return (
    <div className={styles.portalAuthenticatedOuterWrapper}>
      <div
        className={
          isOpen ? "portalLeftTabWrapper" : "portalLeftTabWrapper closed"
        }
      >
        <FcNext
          onClick={toggleLeftTab}
          className={
            isOpen ? "leftTabToggleIcon" : "leftTabToggleIcon rotatedIcon"
          }
        />
        <div
          className={
            isOpen
              ? "portalLeftTabInnerWrapper"
              : "portalLeftTabInnerWrapper leftTabPanelClosed"
          }
        >
          {data.categories.map((c) => (
            <PortalLeftTab
              category={c.name}
              isOpen={isOpen}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>
      </div>
      <div className={styles.formWrapper}>
        <form>
          {selected.keys.map((k) => (
            <FormInput
              k={k}
              setSelectedCategory={setSelectedCategory}
              setFormData={setFormData}
              formData={formData}
              selected={selected}
            />
          ))}
          <div class="d-grid gap-2">
            <button
              type="button"
              class="btn btn-warning"
              onClick={(e) => cancelEditState(e)}
              style={isEditing ? { display: "block" } : { display: "none" }}
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{ float: "right" }}
              onClick={(e) => handleSubmission(e)}
            >
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <ItemDisplaySection
        dataArray={dataArray}
        selected={selected}
        handleEditState={handleEditState}
      />
      <style jsx global>
        {`
          .leftTabToggleIcon {
            font-size: 1.8rem;
            transform: rotateY(180deg);
            transition: transform 0.3s ease-in-out;
            border-radius: 5px;
            margin: 0.5rem;
          }
          .rotatedIcon {
            transform: rotateY(0deg);
          }
          .portalLeftTabWrapper {
            transition: width 0.5s ease-in-out;
          }
          .portalLeftTabWrapper.closed {
            width: 40px;
            transition: width 0.5s ease-in-out;
          }
          .portalLeftTabInnerWrapper {
            transform: translateX(0);
            transition: transform 0.3s ease-in-out;
          }
          .leftTabPanelClosed {
            transform: translateX(-100%);
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps, { addNewUser, toggleLeftTab })(
  PortalAuthenticated
);
