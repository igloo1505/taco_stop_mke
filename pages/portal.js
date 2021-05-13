import React from "react";
import styles from "../styles/Portal.module.scss";
import PortalLogin from "../components/PortalLogin";

const portal = () => {
  return (
    <div className={styles.portalOuterWrapper}>
      <PortalLogin />
    </div>
  );
};

export default portal;
