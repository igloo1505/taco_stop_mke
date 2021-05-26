import React, { useState, useEffect } from "react";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
import FormInput from "./FormInput";
import { data, submissionHandler } from "./dataForForm";
import { connect, useDispatch } from "react-redux";
import {
  addNewUser,
  getAllUsers,
  updateUserInfo,
} from "../stateManagement/userActions";
import { addNewRecipe, updateRecipe } from "../stateManagement/recipeActions";
import { addNewTacoIngredient } from "../stateManagement/tacoActions";
import { toggleLeftTab } from "../stateManagement/uiActions";
import ItemDisplaySection from "./cmsItemSection/ItemDisplaySection";
import { FcNext } from "react-icons/fc";
import {
  RETURN_SINGLE_ITEM,
  TOGGLE_EDIT_STATE,
  RETURN_SINGLE_RECIPE,
  SET_LEFT_TAB_ARRAY,
  SET_FORM_INPUTS,
} from "../stateManagement/TYPES";
import store from "../stateManagement/store";

const PortalAuthenticated = ({
  user,
  UI: {
    leftTab: { isOpen, tabs: leftTabs },
    form: { inputs: formInputs, data: appWideFormData, as: currentSubCategory },
    isEditing,
  },
  recipes: { allRecipes, filtered: filteredRecipes },
  props: { toggleModal },
  addNewUser,
  updateUserInfo,
  toggleLeftTab,
  addNewRecipe,
  updateRecipe,
  addNewTacoIngredient,
}) => {
  const dispatch = useDispatch();
  const defaultSelected = data.categories[0];
  const [selected, setSelected] = useState(defaultSelected);
  const [selectedItem, setSelectedItem] = useState({});
  const resetFormAndTabs = () => {
    // setSelected(defaultSelected);
    setSelectedCategory("Specials");
  };

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
  const [leftTabKeys, setLeftTabKeys] = useState([]);
  const [hasNestedCategories, setHasNestedCategories] = useState(false);
  const setKeys = () => {
    let filtered = data.categories.filter((d) => d.name === selected.name);
    let arr = [];
    if (filtered[0].subCategories) {
      setHasNestedCategories(true);
      arr.push(selected.name);
      filtered[0].subCategories.forEach((cur) => {
        arr.push(cur.name);
      });
    }
    if (!filtered[0].subCategories) {
      setHasNestedCategories(false);
      data.categories.forEach((currentItem) => {
        arr.push(currentItem.name);
      });
    }
    dispatch({
      type: SET_LEFT_TAB_ARRAY,
      payload: arr,
    });
  };

  const setAppWideFormState = () => {
    let y = data.categories.filter((d) => d.name === selected.name);
    let subCategories = y[0].subCategories;
    let arr = [];
    let as;
    if (subCategories) {
      let filtered = data.categories.filter((d) => d.name === selected.name);
      as = filtered[0].subCategories[0].name;
      filtered[0].subCategories[0].keys.forEach((cur) => {
        arr.push(cur);
      });
    }
    if (!subCategories) {
      y[0].keys.forEach((cur) => {
        arr.push(cur);
      });
      as = null;
    }
    dispatch({ type: SET_FORM_INPUTS, payload: { inputs: arr, as: as } });
  };
  useEffect(() => {
    setAppWideFormState();
  }, [selected, selectedItem, data]);

  const setData = () => {
    setKeys();
    if (selected.name === "User") {
      if (isEditing) {
        return setDataArray(user.filtered);
      } else {
        return setDataArray(user.allUsers);
      }
    }
    if (selected.name === "Recipes") {
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
    if (category === "Back") {
      let x = [];
      data.categories.forEach((currentItem) => {
        x.push(currentItem.name);
      });
      dispatch({
        type: SET_LEFT_TAB_ARRAY,
        payload: x,
      });
      dispatch({
        type: SET_FORM_INPUTS,
        payload: { inputs: data.categories[0].keys, as: null },
      });
      setSelected(defaultSelected);
    }
    if (hasNestedCategories && category !== "Back") {
      let filtered = data.categories.filter((d) => d.name === selected.name);
      let subCats = filtered[0].subCategories.filter(
        (d) => d.name === category
      );
      dispatch({
        type: SET_FORM_INPUTS,
        payload: { inputs: subCats[0].keys, as: category },
      });
    }
    if (!hasNestedCategories) {
      let filtered = data.categories.filter((d) => d.name === category);
      let arr = [];
      if (isEditing === true) {
        dispatch({ type: TOGGLE_EDIT_STATE });
      }
      if (filtered[0].subCategories) {
        setHasNestedCategories(true);
        arr.push(selected.name);
        filtered[0].subCategories.forEach((curr) => {
          arr.push(curr.name);
        });
      }
      if (!filtered[0].subCategories) {
        data.categories.forEach((currentItem) => {
          arr.push(currentItem.name);
        });
      }
      dispatch({
        type: SET_LEFT_TAB_ARRAY,
        payload: arr,
      });
      setSelected(filtered[0]);
    }
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
    if (selected.name === "Tacos" && !isEditing && currentSubCategory) {
      const dataFromState = appWideFormData[selected.name][currentSubCategory];
      let req = {
        ...dataFromState,
        dataType: currentSubCategory,
      };
      await addNewTacoIngredient(req);
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
          {leftTabs &&
            leftTabs.map((c, index) => (
              <PortalLeftTab
                category={c}
                index={index}
                hasNestedCategories={hasNestedCategories}
                isOpen={isOpen}
                selected={selected}
                resetFormAndTabs={resetFormAndTabs}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
        </div>
      </div>
      <div className={styles.formWrapper}>
        <form>
          {formInputs &&
            formInputs
              .filter((k) => k.type !== "boolean")
              .map((k) => (
                <FormInput
                  k={k}
                  setSelectedCategory={setSelectedCategory}
                  setFormData={setFormData}
                  formData={formData}
                  selected={selected}
                  hasNestedCategories={hasNestedCategories}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ))}
          <div className="booleanOuterWrapper">
            <div className="booleanWrapper">
              {formInputs &&
                formInputs
                  .filter((k) => k.type === "boolean")
                  .map((k) => (
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
            </div>
            <div class="d-grid gap-2 buttonContainer">
              <button
                type="button"
                class="btn btn-warning formCancelButton"
                onClick={(e) => cancelEditState(e)}
                style={isEditing ? { display: "block" } : { display: "none" }}
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary formSubmitBtn"
                style={{ float: "right" }}
                onClick={(e) => handleSubmission(e)}
              >
                {isEditing ? "Edit" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ItemDisplaySection
        dataArray={dataArray}
        selected={selected}
        hasNestedCategories={hasNestedCategories}
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
            cursor: pointer;
          }
          .rotatedIcon {
            transform: rotateY(0deg);
          }
          .portalLeftTabWrapper {
            transition: width 0.5s ease-in-out;
            overflow: visible;
            padding-top: 10px;
            padding-bottom: 50px;
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
            .buttonContainer {
              grid-template-columns: 1fr 1fr;
              grid-template-areas: "cancelBtn submitBtn";
              justify-items: flex-end;
            }
            .formSubmitBtn {
              width: 150px;
              grid-area: submitBtn;
              float: right;
            }
            .booleanWrapper {
              display: flex;
              width: 100%;
              justify-content: space-between;
              padding: 20px;
            }
          }
          @media only screen and (max-width: 850px) {
            .buttonContainer {
              grid-template-rows: 1fr 1fr;
              grid-template-areas: "cancelBtn submitBtn";
              justify-items: flex-end;
            }
          }
          @media only screen and (max-width: 450px) {
            .buttonContainer {
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 1fr;
              grid-template-areas: "cancelBtn" "submitBtn";
            }
            .booleanWrapper {
              flex-direction: column;
            }
            .booleanOuterWrapper {
              display: grid;
              grid-template-columns: 1fr 120px;
            }
            .formSubmitBtn {
              width: 100%;
              height: 3rem;
              grid-area: submitBtn;
              float: right;
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
  addNewTacoIngredient,
})(PortalAuthenticated);
