import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Video.module.css";
import { getVideos, getYoutubeVideoById } from "../../lib/videos";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/nav/Navbar";

const Video = ({ item }) => {
  const router = useRouter();
  const [video, setVideo] = useState("");

  const { title, publishTime, description, channelTitle, statistics } = video;

  useEffect(() => {
    setVideo(item[0]);
  }, [item]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.btnVolver}>
        <Link href={"/home"}>
          <div className={styles.wrapperVolver}>
            <Image
              src="/static/arrow_back.svg"
              alt="play"
              width={"32px"}
              height={"32px"}
            />
            <div className={styles.btnVolverContent}>&nbsp;Volver atrás</div>
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
            {statistics && (
              <>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Vistas: </span>
                  <span className={styles.channelTitle}>
                    {statistics.viewCount}
                  </span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Likes: </span>
                  <span className={styles.channelTitle}>
                    {statistics.likeCount}
                  </span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Favoritos: </span>
                  <span className={styles.channelTitle}>
                    {statistics.favoriteCount}
                  </span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Comentarios: </span>
                  <span className={styles.channelTitle}>
                    {statistics.commentCount}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Video;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps = async ({ params }) => {
//   const { id } = params;
//   const item = await getVideoById(id);
//   return {
//     props: {
//       item,
//     },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths = async () => {
  const videos = await getVideos();
  const paths = videos.map((video) => {
    return {
      params: {
        id: video.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const item = await getYoutubeVideoById(id);
  return {
    props: {
      item,
    },
    revalidate: 60 * 60,
  };
};
