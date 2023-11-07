import React from "react";
import styles from "./index.module.scss";
import SubscribeForm from "./SubscribeButtons";

const SubscribeButtons = ({ onRssSubscribe, onEmailSubscribe }) => {
  return (
    <div className={styles.buttonsContainer}>
      <button onClick={onRssSubscribe} className={styles.rssButton}>
        RSS
      </button>

      <SubscribeForm onSubscribe={onEmailSubscribe} />
    </div>
  );
};

export default SubscribeButtons;
