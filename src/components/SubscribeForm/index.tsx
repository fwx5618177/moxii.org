import React from "react";
import styles from "./index.module.scss";
import SubscribeForm from "./SubscribeButtons";
import { FaRss } from "react-icons/fa";

const SubscribeButtons = ({ onRssSubscribe, onEmailSubscribe }) => {
  return (
    <div className={styles.buttonsContainer}>
      <div onClick={onRssSubscribe} className={styles.rssButton}>
        <FaRss />
        RSS
      </div>

      <SubscribeForm onSubscribe={onEmailSubscribe} />
    </div>
  );
};

export default SubscribeButtons;
