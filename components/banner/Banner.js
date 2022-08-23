import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Banner.module.css";

const Banner = (props) => {
  const router = useRouter();
  const { imgUrl } = props;

  const handleToLogin = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.uno}>
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
            <div className={styles.right1}>
              <button onClick={handleToLogin} className={styles.btnIniciar}>
                iniciar sesión
              </button>
            </div>
          </div>
          <div className={styles.dos}>
            <div className={styles.cental}>
              <div className={styles.subTitle1}>Películas y series</div>
              <div className={styles.subTitle12}>ilimitadas y mucho más</div>
              <div className={styles.subTitle2}>
                Disfruta donde quieras. Cancela cuando quieras.
              </div>
              <div className={styles.subTitle3}>
                ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta
                o reiniciar tu membresía
              </div>
              <div className={styles.subTitle3}>de Netflix.</div>
              <div className={styles.formIndex}>
                <div className={styles.inputIndex}>
                  <input
                    placeholder="Email"
                    className={styles.inputIndex}
                    type="text"
                  />
                </div>
                <div>
                  <button className={styles.btnInputIndex}>Comenzar</button>
                </div>
              </div>
            </div>
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
