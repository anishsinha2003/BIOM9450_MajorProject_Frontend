"use client";
import styles from "@/styles/researcher/attachLiteratureModal.module.css"
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import config from "../../../../config";

export default function attachLiteratureModal({setOpen, setActionStatus, setLiteratureIdSelected}: {setOpen: any, setActionStatus: any, setLiteratureIdSelected: any}) {


  const [literatureList, setLiteratureList] = useState<any[]>([]);

  useEffect(() => {
      getAllLiteratures();
    }, []);
    async function getAllLiteratures() {
      try {
        const res = await fetch(`${config.BASE_URL}/api/literature/getAllLiterature.php`, {
          method: "POST",
        });
        console.log(res)
        const data = await res.json();
        console.log(data)
        if (data.success) {
          setLiteratureList(data.data);
        } else {
          alert("Failed to fetch literature");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching literature");
      }
    }



  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Select a patient to include their EHR in your query
      </div>
      <div style={{position: "fixed", backgroundColor: "#202D5D", width: "100%", top: "100px", alignSelf: "start", height: "70px", zIndex: 10}}>
      </div>
      <div className={styles.middleContent}>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeaderContainer}>
              <div className={styles.tableHeader} style={{zIndex: 100000}}>
                <div>DocID</div>
                <div>Title</div>
                <div>Source</div>
                <div>Download EHR</div>
              </div>
            </div>
            <br/><br/>
            {literatureList.map((row, idx) => (
              <div
                key={idx}
                className={styles.tableRow}
                style={{ zIndex: 1, cursor: "pointer" }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName !== "INPUT") {
                    setLiteratureIdSelected(row.DocID)
                    setActionStatus("prompt")
                    setOpen(false)
                  }
                }}
              >
                <div>{row.DocID}</div>
                <div>{row.Title}</div>
                <div>{row.Source}</div>
                <div>
                  {row.PDFUrl ? (
                    <a
                      href={`${row.PDFUrl}`}
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
