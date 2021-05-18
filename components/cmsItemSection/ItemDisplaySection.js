import React, { useState } from "react";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import styles from "../../styles/ItemDisplaySection.module.scss";

const ItemDisplaySection = ({
  user,
  props: { dataArray, selected, handleEditState },
}) => {
  switch (selected.name) {
    case "User":
      return (
        <div className={styles.itemDisplaySectionWrapper}>
          {dataArray.map((item) => (
            <UserItem
              item={item}
              key={item._id}
              handleEditState={handleEditState}
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
