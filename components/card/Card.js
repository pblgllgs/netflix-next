import Image from "next/image";
import { useState } from "react";
import styles from "./Card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";
import Modal from "react-modal";
import { getVideoById } from "../../lib/videos";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

const Card = (props) => {
  const router = useRouter();
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

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getVideo = async () => {
    const response = await getVideoById(id);
    setVideo(response);
  };

  const [video, setVideo] = useState("");

  const { title, publishTime, description, channelTitle, tags } = video;

  const scale = id === 0 ? { scale: 1.1 } : { scale: 1.1 };

  const hoverTime = 1500;

  let time;

  const start = () => {
    time = setTimeout(showTooltip, hoverTime);
  };

  const showTooltip = () => {
    getVideo();
    handleOpen();
  };

  const stop = () => {
    clearTimeout(time);
  };

  const handleClickToVideo = () => {
    router.push(`/video/${id}`);
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div>
          <Modal
            id="test"
            isOpen={handleOpen}
            contentLabel="Watch the video"
            onRequestClose={handleClose}
            className={cls(
              `animate__animated animate__fadeIn animate__faster`,
              styles.modal,
            )}
            overlayClassName={styles.overlay}
            preventScroll={true}
            shouldFocusAfterRender={
              true
              /* Boolean indicating if the modal should be focused after render. */
            }
          >
            <div>
              <iframe
                className={styles.videoPlayer}
                width="100%"
                height="420"
                src={`https://www.youtube.com/embed/${id}`}
                title={"Mr. Robot Season 2 Trailer (HD)"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className={styles.modalBody} onClick={handleClickToVideo}>
                <div className={styles.modalBodyContent}>
                  <div className={styles.col1}>
                    <p className={styles.publishTime}>{publishTime}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.description}>{description}</p>
                  </div>
                  <div className={styles.col2}>
                    <p className={cls(styles.subText, styles.subTextWrapper)}>
                      <span className={styles.textColor}>Cast: </span>
                      <span className={styles.channelTitle}>
                        {channelTitle}
                      </span>
                    </p>
                    <p className={cls(styles.subText, styles.subTextWrapper)}>
                      <span className={styles.textColor}>Tags: </span>
                      <div>
                        <ul>
                          {tags &&
                            tags.slice(0, 10).map((tag, idx) => {
                              return <li key={idx}>{tag}</li>;
                            })}
                        </ul>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
        id="modal"
        onMouseOver={start}
        onMouseOut={stop}
        onClick={handleClickToVideo}
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
