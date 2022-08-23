import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const handleToLogin = () => {
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainWrapper}>
        <div className={styles.leftWrapper}>
          <div className={styles.uno}>
            <div className={styles.imgLogo}>
              <Link href="/" passHref>
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
            <div className={styles.blockRight}>
              <div className={styles.btnLenguaje}>
                <button>Español</button>
                <Image
                  src="/static/arrow_drop_down.svg"
                  alt="fecha"
                  width={"32px"}
                  height={"32px"}
                />
              </div>
              <div className={styles.btnInit}>
                <button onClick={handleToLogin} className={styles.btnIniciar}>
                  iniciar sesión
                </button>
              </div>
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
              <div className={styles.subTitle4}>de Netflix.</div>
              <div className={styles.formIndex}>
                <div className={styles.inputIndex}>
                  <input
                    placeholder="Email"
                    className={styles.inputIndex}
                    type="text"
                  />
                </div>
                <div>
                  <button className={styles.btnInputIndex}>
                    <div className={styles.titleBtn}>Comenzar</div>
                    <Image
                      src="/static/chevron_right.svg"
                      alt="fecha"
                      width={"32px"}
                      height={"32px"}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
