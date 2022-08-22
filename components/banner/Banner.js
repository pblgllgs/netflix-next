import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Banner.module.css";

const Banner = (props) => {
  const router = useRouter();
  const { title, subTitle, imgUrl } = props;
  const handleOnPlay = () => {
    console.log("play");
  };

  const handleToLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.imgLogo}>
          <Link href="/home" passHref>
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="play"
                  width={"150px"}
                  height={"50px"}
                />
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.right}>
          <button onClick={handleToLogin} className={styles.btnIniciar}>
            iniciar sesión
          </button>
        </div>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play.svg"
                alt="play"
                width={"32px"}
                height={"32px"}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl}`,
        }}
      ></div>
    </div>
  );
};

export default Banner;
