import React, { useState } from "react";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
import FormInput from "./FormInput";
import { data, submissionHandler } from "./dataForForm";

const PortalAuthenticated = () => {
  const [selected, setSelected] = useState(data.categories[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    User: {},
    Recipes: { ["In Stock"]: false, ["Gluten Free"]: false, ["Spicy"]: false },
  });
  const setSelectedCategory = (category) => {
    let filtered = data.categories.filter((d) => d.name === category);
    setFormData({});
    setSelected(filtered[0]);
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
            onClick={() => console.log("formData", formData)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortalAuthenticated;
