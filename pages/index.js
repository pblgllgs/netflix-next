import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Banner, Navbar, SectionCard } from "../components";

export default function Home() {
  const actionVideos = [
    {
      id: 0,
      imgUrl: "/static/mrrobot.jpg",
    },
    {
      id: 2,
      imgUrl: "/static/theboys.webp",
    },
    {
      id: 3,
      imgUrl: "/static/suits.jpg",
    },
    {
      id: 4,
      imgUrl: "/static/got.jpg",
    },
    {
      id: 4,
      imgUrl: "/static/bb.jpg",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar username="pblgllgs@gmail.com" />
      <Banner
        title={"Mr robot"}
        subTitle={"Have society?"}
        imgUrl="/static/mrrobot.jpg"
      />
      <div className={styles.sectionWrapper}>
        <SectionCard title="Action" videos={actionVideos} size={"large"} />
        <SectionCard
          title="Programming"
          videos={actionVideos}
          size={"medium"}
        />
        <SectionCard title="Programming" videos={actionVideos} size={"small"} />
      </div>
    </div>
  );
}
