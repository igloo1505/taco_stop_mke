import React from "react";
import PortfalLeftTab from "./PortalLeftTab";
import styles from "../styles/PortalAuthenticated.module.scss";
import PortalLeftTab from "./PortalLeftTab";
const data = {
  categories: ["recipes", "users"],
};

const PortalAuthenticated = () => {
  return (
    <div className={styles.portalAuthenticatedOuterWrapper}>
      <div className={styles.portalLeftTab}>
        {data.categories.map((c) => (
          <PortalLeftTab category={c} />
        ))}
      </div>
    </div>
  );
};

export default PortalAuthenticated;
