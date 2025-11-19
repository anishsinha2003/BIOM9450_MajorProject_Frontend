import styles from "@/styles/clinician/clinicianPage.module.css";
import ClinicianDashboardBox1 from "@/components/clinician/ClinicianDashboardBox1";
import ClinicianDashboardBox2 from "@/components/clinician/ClinicianDashboardBox2";
import Image from "next/image";

export default function ClinicianPage() {
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
        <>
        <div className={styles.leftSection}>
          <ClinicianDashboardBox1 />
        </div>

        <div className={styles.rightSection}>
          <ClinicianDashboardBox2 />
        </div>
        </>
      </div>
    </div>
  );
}
