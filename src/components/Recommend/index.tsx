import { FaCalendarAlt, FaThumbsUp } from "react-icons/fa";
import styles from "./index.module.scss";
import Image from "next/image";
import moment from "moment";

const Recommend = ({
  updatedDate,
  title = "这是一篇文章, 这是一篇文章",
  imageUrl = "https://picsum.photos/256/200",
  language = "Chinese",
}) => {
  return (
    <div className={styles["recommend-container"]}>
      <div className={styles["recommend-header"]}>
        <FaThumbsUp className={styles["recommend-header-icon"]} /> 相关推荐
      </div>

      <div className={styles["recommend-article"]}>
        <div className={styles["ribbon-language"]}>{language}</div>
        <Image
          className={styles["recommend-article-image"]}
          width={256}
          height={200}
          src={imageUrl}
          alt={"recommend"}
        />
        <div className={styles["recommend-article-body"]}>
          <span>
            <FaCalendarAlt /> {moment(updatedDate).format("YYYY-MM-DD")}
          </span>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Recommend;
