import React from "react";
import styles from "../styles/PortalLeftTab.module.scss";
import { connect } from "react-redux";
const portalLeftTab = ({ category, setSelectedCategory }) => {
  return (
    <div
      className={styles.portalLeftTab}
      onClick={() => setSelectedCategory(`${category}`)}
      key={category}
    >
      {category}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  props: props,
});

export default connect(mapStateToProps)(portalLeftTab);
