import React, { useState } from "react";
import styles from "../styles/PortalLogin.module.scss";
import { authenticateUser, addNewUser } from "../stateManagement/userActions";
import { connect } from "react-redux";

const PortalLogin = ({ userState, props, authenticateUser, addNewUser }) => {
  const [user, setUser] = useState({});
  const handlePortalLogin = async () => {
    // authenticateUser(user);
    // addNewUser(user);
    authenticateUser(user);
  };
  return (
    <div className={styles.PortalLoginContainer}>
      <div className={styles.portalLoginCard}>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="portalLoginEmail"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="portalLoginPassword"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => handlePortalLogin()}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, initialProps) => ({
  userState: state.user,
  props: state.props,
});

export default connect(mapStateToProps, { authenticateUser, addNewUser })(
  PortalLogin
);
