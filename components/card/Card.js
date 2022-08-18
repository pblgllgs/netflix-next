import Image from "next/image";
import { useState } from "react";
import styles from "./Card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = (props) => {
  const {
    imgUrl = "https://res.cloudinary.com/pblgllgs/image/upload/v1660838675/not-found-image/image-not-found_rixymv.jpg",
    size = "medium",
    id,
  } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const handleOnError = () => {
    setImgSrc(imgUrl);
  };

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const scale = id === 0 ? { scale: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt="img"
          layout="fill"
          onError={handleOnError}
          className={styles.cardImg}
          priority
        />
      </motion.div>
    </div>
  );
};

export default Card;
