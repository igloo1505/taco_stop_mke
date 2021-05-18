import React, { useState, useEffect } from "react";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
import FormInput from "./FormInput";
import { data, submissionHandler } from "./dataForForm";
import { connect } from "react-redux";
import { addNewUser, getAllUsers } from "../stateManagement/userActions";
import ItemDisplaySection from "./cmsItemSection/ItemDisplaySection";

const PortalAuthenticated = ({ user, props: { toggleModal }, addNewUser }) => {
  const [selected, setSelected] = useState(data.categories[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    User: {
      ["First Name"]: "",
      ["Last Name"]: "",
      Username: "",
      Password: "",
      ["Confirm Password"]: "",
    },
    Recipes: { ["In Stock"]: false, ["Gluten Free"]: false, ["Spicy"]: false },
  });
  const [dataArray, setDataArray] = useState([]);

  const setData = () => {
    switch (selected.name) {
      case "User":
        return setDataArray(user.allUsers);
      default:
        return setDataArray([]);
    }
  };

  useEffect(() => {
    console.log("Did run in useEffect");
    setData();
  }, [selected.name, user]);

  const setSelectedCategory = (category) => {
    let filtered = data.categories.filter((d) => d.name === category);
    // setFormData({});
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
      <div className={styles.portalLeftTab}>
        {data.categories.map((c) => (
          <PortalLeftTab
            category={c.name}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
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
          <button
            type="button"
            class="btn btn-primary"
            style={{ float: "right" }}
            onClick={(e) => handleSubmission(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <ItemDisplaySection dataArray={dataArray} selected={selected} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps, { addNewUser })(PortalAuthenticated);
