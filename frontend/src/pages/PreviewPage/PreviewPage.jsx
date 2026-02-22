import React from "react";
import styles from "./PreviewPage.module.scss";
// components
import Lobby from "../../components/Lobby/Lobby";

const PreviewPage = () => {
  return (
    <div className={styles.container}>
      <Lobby />
    </div>
  );
};

export default PreviewPage;
