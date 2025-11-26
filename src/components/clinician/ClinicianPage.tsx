import Tabs from "@/components/clinician/llmQuery/ClinicianTabs";
import styles from "@/styles/clinician/clinicianPage.module.css";
import ClinicianLlmBox from "@/components/clinician/llmQuery/ClinicianLlmBox";
import Image from "next/image";
import ClinicianUploadLiteratureBox from "./literature/ClinicianLiteratureBox";
import ClinicianPatientBox from "./patient/ClinicianPatientBox";
import { useLoading } from "../LoadingContext";
import Loading from "../Loading";

export default function ClinicianPage() {
  const { loading } = useLoading();
  if (loading) return <Loading />;
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
