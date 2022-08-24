import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Video.module.css";
import { getVideoById } from "../../lib/videos";
import { useEffect, useState } from "react";

const Video = ({ item }) => {
  const router = useRouter();

  const [video, setVideo] = useState("");

  const { title, publishTime, description, channelTitle } = video;

  useEffect(() => {
    setVideo(item);
  }, [item]);

  return (
    <div className={styles.container}>
      <div className={styles.btnVolver}>
        <Link href={"/home"}>
          <div className={styles.wrapperVolver}>
            <Image
              src="/static/arrow_back.svg"
              alt="play"
              width={"32px"}
              height={"32px"}
            />
            <div className={styles.btnVolverContent}> Volver atrás</div>
          </div>
        </Link>
      </div>
      <div className={styles.video}>
        <iframe
          className={styles.videoPlayer}
          width="100%"
          height="550"
          src={`https://www.youtube.com/embed/${router.query.id}`}
          title={title}
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
            {/* <p className={cls(styles.subText, styles.subTextWrapper)}>
              <span className={styles.textColor}>Tags: </span>
              <div>
                <ul>
                  {tags
                    ? tags.slice(0, 10).map((tag, idx) => {
                        return <li key={idx}>{tag}</li>;
                      })
                    : "No hay tags"}
                </ul>
              </div>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const item = await getVideoById(id);
  return {
    props: {
      item,
    },
  };
};
