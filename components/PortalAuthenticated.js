import React, { useState, useEffect } from "react";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
import FormInput from "./FormInput";
import { data, submissionHandler } from "./dataForForm";
import { connect } from "react-redux";
import {
  addNewUser,
  getAllUsers,
  updateUserInfo,
} from "../stateManagement/userActions";
import { addNewRecipe, updateRecipe } from "../stateManagement/recipeActions";
import { toggleLeftTab } from "../stateManagement/uiActions";
import ItemDisplaySection from "./cmsItemSection/ItemDisplaySection";
import { FcNext } from "react-icons/fc";
import {
  RETURN_SINGLE_ITEM,
  TOGGLE_EDIT_STATE,
  RETURN_SINGLE_RECIPE,
} from "../stateManagement/TYPES";
import { useDispatch } from "react-redux";
import store from "../stateManagement/store";
const PortalAuthenticated = ({
  user,
  UI: {
    leftTab: { isOpen },
    isEditing,
  },
  recipes: { allRecipes, filtered: filteredRecipes },
  props: { toggleModal },
  addNewUser,
  updateUserInfo,
  toggleLeftTab,
  addNewRecipe,
  updateRecipe,
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
    Recipes: {
      ["In Stock"]: false,
      ["Gluten Free"]: false,
      ["Spicy"]: false,
      Price: "",
      Category: "",
      Title: "",
      Description: "",
    },
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
      console.log("filteredRecipes", filteredRecipes);
      if (isEditing) {
        return setDataArray(filteredRecipes);
      } else {
        return setDataArray(allRecipes);
      }
    }
  };

  const handleEditState = (obj) => {
    if (obj.firstName) {
      // only users pass in here
      setSelectedItem(
        obj
          ? {
              ["First Name"]: obj.firstName,
              ["Last Name"]: obj.lastName,
              Username: obj.userName,
              Password: "",
              createdAt: obj.createdAt,
              _id: obj._id,
            }
          : {}
      );
    }
    if (obj.price) {
      // Hopefully only recipes in here
      console.log("obj", obj);
      setSelectedItem(
        obj
          ? {
              ["In Stock"]: obj.isInStock,
              ["Gluten Free"]: obj.isGlutenFree,
              Spicy: obj.isHot,
              Category: obj.category,
              Description: obj.description,
              Title: obj.name,
              Price: obj.price,
              _id: obj._id,
            }
          : {}
      );
    }
    // setSelectedItem(
    //   obj
    //     ? {
    //         ["First Name"]: obj.firstName,
    //         ["Last Name"]: obj.lastName,
    //         Username: obj.userName,
    //         Password: "",
    //         createdAt: obj.createdAt,
    //         _id: obj._id,
    //       }
    //     : {}
    // );
    if (selected.name === "User") {
      dispatch({
        type: RETURN_SINGLE_ITEM,
        payload: { _id: obj._id },
      });
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
    if (selected.name === "Recipes") {
      dispatch({
        type: RETURN_SINGLE_RECIPE,
        payload: { _id: obj._id },
      });
      dispatch({ type: TOGGLE_EDIT_STATE });
      setFormData({
        Recipes: {
          ["In Stock"]: obj.isInStock,
          ["Gluten Free"]: obj.isGlutenFree,
          Spicy: obj.isHot,
          Category: obj.category,
          Title: obj.name,
          Price: obj.price,
        },
        User: { ...formData.User },
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
  }, [selected.name, user, isEditing, allRecipes]);

  const setSelectedCategory = (category) => {
    let filtered = data.categories.filter((d) => d.name === category);
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
    if (selected.name === "User" && isEditing) {
      let x = await updateUserInfo(selectedItem);
      if (x) {
        setFormData({
          ...formData,
          Recipes: { ...formData.Recipes },
          User: { ...initialFormData.User },
        });
      }
    }
    if (selected.name === "Recipes" && !isEditing) {
      console.log("Sending...", formData.Recipes);
      setFormData({
        ...formData,
        Recipes: { ...initialFormData.Recipes },
        User: { ...formData.User },
      });
      await addNewRecipe(formData.Recipes);
    }
    if (selected.name === "Recipes" && isEditing) {
      await updateRecipe(selectedItem);
      console.log("formData", formData);
      console.log("initalFormData", initialFormData);
      setFormData({
        ...formData,
        Recipes: { ...initialFormData.Recipes },
        User: { ...formData.User },
      });
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
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
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
        selectedItem={selectedItem}
        formData={formData}
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
            overflow: visible;
          }
          .portalLeftTabWrapper.closed {
            width: 40px;
            transition: width 0.5s ease-in-out;
          }
          .portalLeftTabInnerWrapper {
            transform: translateX(0);
            transition: transform 0.3s ease-in-out;
            overflow: visible;
          }
          .leftTabPanelClosed {
            transform: translateX(-100%);
          }
          @media only screen and (max-width: 850px) {
            .portalLeftTabWrapper {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps, {
  addNewUser,
  toggleLeftTab,
  updateUserInfo,
  addNewRecipe,
  updateRecipe,
})(PortalAuthenticated);
