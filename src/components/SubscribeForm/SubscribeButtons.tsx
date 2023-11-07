import React, { useState } from "react";
import styles from "./index.module.scss";

const SubscribeForm = ({ onSubscribe }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubscribe(email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.subscribeForm}>
      <input
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className={styles.emailButton}>
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeForm;
