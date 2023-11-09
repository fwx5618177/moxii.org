import styles from "./index.module.scss";
import { HeaderProps } from "Components";
import { FC } from "react";

const Header: FC<HeaderProps> = ({ children, small, height = 150 }) => {
  return (
    <div
      className={styles["bg-image-small"]}
      style={{
        height,
        backgroundImage: small ? `url(${small})` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default Header;
