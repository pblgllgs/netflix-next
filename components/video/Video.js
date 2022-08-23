import cls from "classnames";
import { useRouter } from "next/router";
import styles from "../../styles/Video.module.css";

const Video = ({ item }) => {
  const router = useRouter();
  const { title, publishTime, description, channelTitle } = item;
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <iframe
          className={styles.videoPlayer}
          width="100%"
          height="420"
          src={`https://www.youtube.com/embed/${router.query.id}`}
          title={"Mr. Robot Season 2 Trailer (HD)"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.modalBody}>
        <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.col2}>
            <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Cast: </span>
              <span className={styles.channelTitle}>{channelTitle}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
