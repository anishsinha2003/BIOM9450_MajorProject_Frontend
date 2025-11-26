"use client";
import styles from "@/styles/clinician/clinicianPatientBox.module.css"
import { Box, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ClinicianAddPatientModal from "./ClinicianAddPatientModal";
import config from "../../../../config";


export default function ClinicianPatientBox() {
  // open add patient modal
  const [open, setOpen] = useState(false)

  // upload literatre
  const [patientsList, setPatientsList] = useState<any[]>([]);

  // a flag for useffect to update the table after adding something new
  const [updateTableFlag, setUpdateTableFlag] = useState(false)


  useEffect(() => {
    getAllPatients();
  }, [updateTableFlag]);
  async function getAllPatients() {
    try {
      const res = await fetch(`${config.BASE_URL}/api/patient/getAllPatients.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.success) {
        setPatientsList(data.data);
      } else {
        console.error("Server error:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }

  }


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Patients and their EHR's
      </div>
      <div className={styles.middleContent}>
        <br/>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.tableHeader} style={{zIndex: 2}}>
              <div>PatientId</div>
              <div>FirstName</div>
              <div>LastName</div>
              <div>Sex</div>
              <div>Download EHR</div>
            </div>
            {patientsList.map((row, idx) => (
              <div key={idx} className={styles.tableRow} style={{zIndex: 1}}>
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
      <div className={styles.addButton}  onClick={() => setOpen(true)}>
        <label
          className={styles.text2}
          style={{cursor: "pointer"}}
        >
            Add Patient
        </label>
      </div>
      <Modal
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
              backdrop: {
              sx: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
              },
          }}
      >
          <Box
              sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 1200,
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: 0,
                  borderRadius: "14px",
                  outline: 'none',
                  overflow: "hidden"

          }}
          >
              <ClinicianAddPatientModal setOpen={setOpen} setUpdateTableFlag={setUpdateTableFlag} updateTableFlag={updateTableFlag}/>
          </Box>
      </Modal>
    </div>
  );
}
