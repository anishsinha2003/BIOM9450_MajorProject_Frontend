import ResearcherLiteratureSummary from "@/components/researcher/llmQuery/ResearcherLiteratureSummaryBox";
import styles from "@/styles/researcher/researcherPage.module.css";
import ResearcherDashboardBox2 from "@/components/researcher/ResearcherDashboardBox2";
import ResearcherLiteratureBox from "@/components/researcher/literature/ResearcherLiteratureBox";
import Image from "next/image";
import { useUser } from "@/components/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';



export default function ResearcherPage() {
  const {setUser, user, logout} = useUser();

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
          <span className={styles.headerText}>Welcome to your Dashboard <span style={{fontWeight: "bold", color: "#8097eeff"}}>{user?.name}!</span></span>
          <div className={styles.logout} onClick={logout}><LogoutIcon sx={{fontSize: "30px"}}/></div>
        </div>
        <div className={styles.leftSection}>
          <ResearcherLiteratureSummary/>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.rightTop}>
            <ResearcherDashboardBox2/>
          </div>
          <div className={styles.rightBottom}>
            <ResearcherLiteratureBox/>
          </div>
        </div>
      </div>
    </div>
  );
}
