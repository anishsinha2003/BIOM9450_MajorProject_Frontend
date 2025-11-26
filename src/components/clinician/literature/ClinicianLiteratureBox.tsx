"use client";
import Loading from "@/components/Loading";
import { useLoading } from "@/components/LoadingContext";
import styles from "@/styles/clinician/clinicianLiteratureBox.module.css"
import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import config from "../../../../config";


export default function ClinicianLiteratureBox() {
  const [loading, setLoading] = useState(false)

  // a flag for useffect to update the table after adding something new
  const [updateTableFlag, setUpdateTableFlag] = useState(false)

  // upload literatre
  const [literatureList, setLiteratureList] = useState<any[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: any) => {

    const uploaded = e.target.files[0];
    if (uploaded && uploaded.type !== "application/pdf") {
        alert("Only PDF files allowed!");
        return;
    }
    uploadFile(uploaded);


  };

  useEffect(() => {
    getAllLiterature();
  }, [updateTableFlag]);
  async function getAllLiterature() {
    try {
      const res = await fetch(`${config.BASE_URL}/api/literature/getAllLiterature.php`, {
        method: "POST",
      });
      const data = await res.json();
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

  const uploadFile = async (uploaded: any) => {
    if (!uploaded) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", uploaded);
    formData.append("title", uploaded.name);

    let success = false;
    try {
      setLoading(true);
      const res = await fetch(`${config.BASE_URL}/api/literature/uploadLiterature.php`, {
        method: "POST",
        body: formData,
      });
      success = res.ok;
    } catch (e) {
      console.error(e);
      success = false;
    }
    setTimeout(() => {
      setLoading(false);
      alert(success ? "Uploaded successfully!" : "Upload failed!");
      setUpdateTableFlag(!updateTableFlag)
    }, 1000);

  };
  console.log(literatureList)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Uploaded Literatures
      </div>
      {loading
        ?
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <CircularProgress sx={{color: "#fafafa92"}}/>
          </div>
        :
          <>
            <div className={styles.middleContent}>
              <br/>
              <div className={styles.tableContainer}>
                <div className={styles.table}>
                  <div className={styles.tableHeader} style={{zIndex: 2}}>
                    <div>ID</div>
                    <div>Time & Date</div>
                    <div>Title</div>
                    <div>Download</div>
                  </div>
                  {literatureList.map((row, idx) => (
                    <div key={idx} className={styles.tableRow} style={{zIndex: 1}}>
                      <div>{row.DocID}</div>
                      <div>{row.CreatedAt}</div>
                      <div>{row.Title}</div>
                      <div>
                        {row.PDFUrl ? (
                          <a
                            href={row.PDFUrl}
                            target="_blank"
                            download
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

            <label className={styles.addButton} style={{ cursor: "pointer" }}>
              Add
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </label>

          </>

      }
    </div>
  );
}
