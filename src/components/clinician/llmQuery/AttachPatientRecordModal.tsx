"use client";
import styles from "@/styles/clinician/attachPatientRecordModal.module.css"
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import config from "../../../../config";

export default function AttachPatientRecordModal({setOpen, setActionStatus, setEhrIdSelected}: {setOpen: any, setActionStatus: any, setEhrIdSelected: any}) {


  const [ehrList, setEhrList] = useState<any[]>([]);

  useEffect(() => {
      getAllPatients();
    }, []);
    async function getAllPatients() {
      try {
        const res = await fetch(`${config.BASE_URL}/api/patient/getAllPatients.php`, {
          method: "POST",
        });
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (data.success) {
          setEhrList(data.data);
        } else {
          alert("Failed to fetch literature");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching literature");
      }
    }
    console.log(ehrList)


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Select a patient to include their EHR in your query
      </div>
      <div style={{position: "fixed", backgroundColor: "#203B45", width: "100%", top: "100px", alignSelf: "start", height: "70px", zIndex: 10}}>
      </div>
      <div className={styles.middleContent}>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeaderContainer}>
              <div className={styles.tableHeader} style={{zIndex: 100000}}>
                <div>PatientId</div>
                <div>FirstName</div>
                <div>LastName</div>
                <div>Sex</div>
                <div>Download EHR</div>
              </div>
            </div>
            <br/><br/>
            {ehrList.map((row, idx) => (
              <div
                key={idx}
                className={styles.tableRow}
                style={{ zIndex: 1, cursor: "pointer" }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== "INPUT") {
                    setEhrIdSelected(row.EhrID)
                    setActionStatus("prompt")
                    setOpen(false)
                  }
                }}
              >
                <div>{row.PatientID}</div>
                <div>{row.FirstName}</div>
                <div>{row.LastName}</div>
                <div>{row.Sex}</div>
                <div>
                  {row.PDFPath ? (
                    <a
                      href={`${config.BASE_URL}${row.PDFPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={styles.download}
                    >
                      Download
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className={styles.close} onClick={() => setOpen(false)}>
        <CloseIcon/>
      </div>

    </div>
  );
}
