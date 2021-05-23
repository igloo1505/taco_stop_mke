import React, { useState } from "react";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import RecipeItem from "./RecipeItem";
import styles from "../../styles/ItemDisplaySection.module.scss";

const ItemDisplaySection = ({
  user,
  props: { dataArray, selected, handleEditState, selectedItem, formData },
}) => {
  switch (selected.name) {
    case "User":
      return (
        <div
          className={`${styles.wrapperWithUser} ${styles.itemDisplaySectionWrapper}`}
        >
          {dataArray.map((item) => (
            <UserItem
              item={item}
              key={item._id}
              handleEditState={handleEditState}
              selectedItem={selectedItem}
              formData={formData}
            />
          ))}
        </div>
      );
    case "Recipes":
      return (
        <div
          className={`${styles.wrapperWithRecipes} ${styles.itemDisplaySectionWrapper}`}
        >
          {dataArray.map((item) => (
            <RecipeItem
              item={item}
              key={item._id}
              handleEditState={handleEditState}
              selectedItem={selectedItem}
              formData={formData}
            />
          ))}
        </div>
      );
    default:
      return (
        <div>
          {dataArray.map((item) => (
            <p>{item.userName}</p>
          ))}
        </div>
      );
  }
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});
export default connect(mapStateToProps)(ItemDisplaySection);
