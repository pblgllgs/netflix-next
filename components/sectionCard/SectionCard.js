import React from "react";
import Card from "../card/Card";
import styles from "./SectionCard.module.css";

const SectionCard = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return (
            <Card key={idx} imgUrl={video.imgUrl} size={size} id={video.id} />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
