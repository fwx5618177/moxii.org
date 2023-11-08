import React from "react";
import styles from "./index.module.scss";
import SubscribeForm from "./SubscribeButtons";
import { FaRss } from "react-icons/fa";
import { SubscribeEmailApi } from "@/app/api/subscribeForm/Api";
import { useMutation } from "react-query";
import { message } from "antd";

const SubscribeButtons = () => {
  const { mutate: subscribe } = useMutation(
    SubscribeEmailApi.subscribeEmail<any, { recipientEmail: string }>
  );

  const onRssSubscribe = () => {};
  const onEmailSubscribe = (email: string) => {
    subscribe({
      recipientEmail: email,
    });

    message.success("Subscribed successfully.");
  };

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

export default React.memo(SubscribeButtons);
