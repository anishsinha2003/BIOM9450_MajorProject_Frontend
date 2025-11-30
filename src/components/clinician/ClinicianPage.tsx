import Tabs from "@/components/clinician/llmQuery/ClinicianTabs";
import styles from "@/styles/clinician/clinicianPage.module.css";
import ClinicianLlmBox from "@/components/clinician/llmQuery/ClinicianLlmBox";
import Image from "next/image";
import ClinicianUploadLiteratureBox from "./literature/ClinicianLiteratureBox";
import ClinicianPatientBox from "./patient/ClinicianPatientBox";
import { useUser } from "@/components/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';

export default function ClinicianPage() {
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
          <span className={styles.headerText}>Welcome to your Dashboard <span style={{fontWeight: "bold", color: "#48a7b0ff"}}>{user?.name}</span>!</span>
          <div className={styles.logout} onClick={logout}><LogoutIcon sx={{fontSize: "30px"}}/></div>
        </div>
        <>
          <div className={styles.leftSection}>
            <ClinicianLlmBox/>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.rightTop}>
              <ClinicianPatientBox/>
            </div>
            <div className={styles.rightBottom}>
              <ClinicianUploadLiteratureBox/>
            </div>
          </div>

        </>
      </div>
    </div>
  );
}
