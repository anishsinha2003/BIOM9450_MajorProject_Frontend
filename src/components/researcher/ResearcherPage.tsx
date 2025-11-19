import ResearcherDashboardBox1 from "@/components/researcher/ResearcherDashboardBox1";
import styles from "@/styles/researcher/researcherPage.module.css";
import ResearcherDashboardBox2 from "@/components/researcher/ResearcherDashboardBox2";
import ResearcherDashboardBox3 from "@/components/researcher/ResearcherDashboardBox3";
import Image from "next/image";

export default function ResearcherPage() {
  return (
    // researxher
    <div className={styles.pageContainer}>

      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <Image
            src="/logo2.png"
            alt="Dashboard Icon"
            width={150}
            height={150}
            className={styles.headerImage}
          />
          <span className={styles.headerText}>Welcome to your Dashboard, Anish!</span>
        </div>
        <div className={styles.leftSection}>
          <ResearcherDashboardBox1/>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.rightTop}>
            <ResearcherDashboardBox2/>
          </div>
          <div className={styles.rightBottom}>
            <ResearcherDashboardBox3/>
          </div>
        </div>
      </div>
    </div>
  );
}
