"use client";
import styles from "@/styles/homePage.module.css"
import { useRouter } from "next/navigation";
import Image from "next/image";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.pageContainer}>

      <div className={styles.topSection}>

        <img src="/logo2.png" alt="Logo" className={styles.logo} />
        <div className={styles.topContainer}>
          <div className={styles.leftTopContentContainer}>
            <div className={styles.leftTopContent}>
              <h1 className={styles.title}>Welcome to <span style={{color: "#5F87FF"}}>CliniAi</span>!</h1>
              <p className={styles.blurb}>
                Generate diagnostic insights, treatment plans, and literature-backed reports from patient EHR data using advanced Large Language Models.
              </p>
              <button className={styles.ctaButton}  onClick={() => router.push("/login")}>Get Started</button>
            </div>
          </div>
          <div className={styles.rightImageContainer}>
            <Image
              src="/homepageImage.png"
              alt="Dashboard Icon"
              width={600}
              height={400}
              className={styles.rightImage}
            />
          </div>
        </div>

      </div>

      <div className={styles.bottomSection}>
        <h2 className={styles.aboutTitle}>About Us</h2>

        <p className={styles.aboutDescription}>
         Generate diagnostic insights, treatment plans, and literature-backed reports from patient EHR data using advanced Large Language Models. Generate diagnostic insights, treatment plans, and literature-backed reports from patient EHR data using advanced Large Language Models. Generate diagnostic insights, treatment plans, and literature-backed reports from patient EHR data using advanced Large Language Models. Generate diagnostic insights, treatment plans, and literature-backed reports from patient EHR data using advanced Large Language Models.
        </p>
        <br/><br/>
        <div className={styles.socials}>
          <span><LinkedInIcon fontSize="small"/></span>
          <span><FacebookIcon fontSize="small"/></span>
          <span><XIcon fontSize="small"/></span>
        </div>
      </div>

    </div>
  );
}
