"use client";
import { useEffect, useState } from "react";
import config from "@../../../config";
import styles from "@/styles/researcher/researcherDashboardBox3.module.css";


export default function ResearcherDashboardBox3() {
  const [allLit, setAllLit] = useState<any[]>([]);
  const [litError, setLitError] = useState<string | null>(null);

  // refresh flag
  const [updateLitFlag, setUpdateLitFlag] = useState(false);

  useEffect(() => {
    getAllLiterature();
  }, [updateLitFlag]);

  async function getAllLiterature() {
    try {
      setLitError(null);

      const res = await fetch(
        `${config.BASE_URL}/api/literature/getAllLiterature.php`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json" 
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setAllLit(data.data);
      } else {
        setLitError("Error loading literature summaries.");
      }
    } catch (err) {
      console.error(err);
      setLitError("Error loading literature summaries.");
    }
  }

  return (
    <div className={styles.container} style={{ width: "100%", height: "100%" }}>
      <div className={styles.title}>View All Literature Summaries</div>

      {litError && (
        <div style={{ 
            color: "#da4242", 
            fontSize: "12px" 
          }}>
          {litError}
        </div>
      )}
      
      {allLit.length === 0 && !litError && (
        <div 
        style={{
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.85)",
          paddingTop: "30px",
        }}
        >
          No literature summaries have been uploaded.
        </div>
      )}

      {allLit.length > 0 && !litError &&  (
        <div className={styles.summaryTable}>
          <div className={styles.headerRow}>
            <div>Title</div>
            <div>Literature Source</div>
            <div>Literature Summary Preview</div>
            <div>PDF</div>
            <div>Created on</div>
          </div>
          {allLit.map((val) => (
            <div key={val.DocID} className={styles.tableRow}>
              <div>{val.Title}</div>
              <div>{val.Source}</div>
              <div 
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              >
                {val.ReportText}
              </div>
              <div>
                {val.PDFUrl ? (
                  <a
                    href={val.PDFUrl}
                    target="_blank"
                    className={styles.pdfUrl}
                  >
                    View Entire PDF
                  </a>
                ) : (
                  "No PDF link"
                )}
              </div>
              <div>{new Date(val.CreatedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
