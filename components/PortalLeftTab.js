import React from "react";
import styles from "../styles/PortalLeftTab.module.scss";
const portalLeftTab = ({ category }) => {
  return <div className={styles.portalLeftTab}>{category}</div>;
};

export default portalLeftTab;
