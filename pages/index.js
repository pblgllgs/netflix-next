import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner, Navbar, SectionCard } from "../components";
import { getPopularVideos, getVideos } from "../lib/videos";

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
  const actionVideos = await getVideos("razer");
  const programmingVideos = await getVideos("programming");
  const spaceVideos = await getVideos("space");
  const popularVideos = await getPopularVideos();
  return {
    props: {
      actionVideos,
      programmingVideos,
      spaceVideos,
      popularVideos,
    },
  };
};
