import React from "react";
import styles from "../../styles/ItemDisplaySection.module.scss";
import { removeUser } from "../../stateManagement/userActions";
import { connect } from "react-redux";
const UserItem = ({
  user: { allUsers },
  UI: { isEditing },
  props: { item, handleEditState },
  removeUser,
}) => {
  const { userName, firstName, lastName, createAt, updatedAt, _id } = item;

  const handleDeleteUser = () => {
    //   TODO Add confirmation Modal here before deleting
    console.log("Add confirmation modal here!");
    removeUser({ userID: _id });
  };

  const handleEditStateChange = () => {
    let selected = allUsers.filter((user) => user._id === _id);
    handleEditState(selected[0]);
  };

  return (
    <div className="card bg-light">
      <div className={styles.cardUserNameText}>{userName}</div>
      <div className={styles.givenNameText}>
        {lastName}, {firstName}
      </div>
      <div className={styles.cardButtonContainer}>
        <button
          type="button"
          className="btn btn-outline-warning"
          style={isEditing ? { display: "none" } : { marginRight: "5px" }}
          onClick={handleEditStateChange}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          style={isEditing ? { display: "none" } : { marginLeft: "5px" }}
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </div>
      <style jsx>
        {`
          .card {
            width: 90%;
            min-height: 150px;
            padding: 16px;
            margin: 12px 5%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            border-radius: 5px;
          }
          .card:hover {
            box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
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

export default connect(mapStateToProps, { removeUser })(UserItem);
