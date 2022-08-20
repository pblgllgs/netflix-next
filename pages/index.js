import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner, Navbar, SectionCard } from "../components";
import {
  getCommonVideosLocal,
  getPopularVideos,
  getVideos,
} from "../lib/videos";
import { mostPopular, series, programming, space } from "../data";
import { env } from "../config/config";

export default function Home({
  actionVideos,
  programmingVideos,
  spaceVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar username="pblgllgs@gmail.com" />
      <div className={styles.main}>
        <Banner
          title={"Mr robot"}
          subTitle={"Have society?"}
          imgUrl="/static/mrrobot.jpg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Action" videos={actionVideos} size={"large"} />
          <SectionCard title="Space" videos={spaceVideos} size={"medium"} />
          <SectionCard
            title="Programming"
            videos={programmingVideos}
            size={"small"}
          />
          <SectionCard title="Popular" videos={popularVideos} size={"medium"} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  let actionVideos = [];
  let programmingVideos = [];
  let spaceVideos = [];
  let popularVideos = [];
  const environment = env();
  switch (environment) {
    case "local":
      actionVideos = await getCommonVideosLocal(series);
      programmingVideos = await getCommonVideosLocal(programming);
      spaceVideos = await getCommonVideosLocal(space);
      popularVideos = await getCommonVideosLocal(mostPopular);
      break;
    case "web":
      actionVideos = await getVideos("series");
      programmingVideos = await getVideos("programming");
      spaceVideos = await getVideos("space");
      popularVideos = await getPopularVideos();
  }
  return {
    props: {
      actionVideos,
      programmingVideos,
      spaceVideos,
      popularVideos,
    },
  };
};
