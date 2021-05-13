import React from "react";
import styles from "../styles/Portal.module.scss";
import PortalLogin from "../components/PortalLogin";
import PortalAuthenticated from "../components/PortalAuthenticated";
import { connect } from "react-redux";

const portal = ({
  user: {
    loggedIn,
    user: { token, id },
  },
}) => {
  console.log(loggedIn, token);
  return (
    <div className={styles.portalOuterWrapper}>
      {loggedIn && token ? <PortalAuthenticated /> : <PortalLogin />}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
});

export default connect(mapStateToProps)(portal);
