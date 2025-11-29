"use client";

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import config from "@../../../config";
import styles from "@/styles/researcher/researcherDashboardBox2.module.css";

export default function ResearcherDashboardBox2() {
  const [title, setTitle] = useState("");
  const [literatureSummary, setLiteratureSummary] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    summary: false,
  });

  const handleSubmit = async () => {
    // initialise 
    setMessage(null);
    setErr(null);
    const newErrors = { title: false, summary: false };
    let errCheck = false;

    // remove trailing whitespace
    const validLitSummary = literatureSummary.trim();

    // error checking empty or extra long lit summaries
    if (!validLitSummary) {
      newErrors.summary = true;
      errCheck = true;
      setErr("Please enter a Literature Summary.");
    } else if (validLitSummary.length > 2000) {
      newErrors.summary = true;
      errCheck = true;
      setErr("Literature Summary cannot exceed 2000 characters.");
    }
    if (errCheck) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("summary", validLitSummary);
    formData.append("title", title.trim());

    let success = false;

    try {
      const res = await fetch(
        `${config.BASE_URL}/api/literature/uploadLiteratureText.php`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          success = true;
          setMessage("Literature Summary uploaded.");
          setTitle("");
          setLiteratureSummary("");
        } else {
          success = false;
          setErr("Something went wrong.");
        }
      } else {
        success = false;
        setErr("Error uploading literature summary.");
      }
    } catch (err) {
      success = false;
      setErr("Error uploading literature summary.");
    }
  };

  return (
    <div className={styles.container}>
          <h2 className={styles.title}>Upload Literature Summary</h2>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${styles.input} ${
                  errors.title ? styles.errorInput : ""
                }`}
              />
            </div>
            <div>
              <label className={styles.label}>
                Literature Summary (max 2000 characters)
              </label>
              <textarea
                value={literatureSummary}
                onChange={(e) => setLiteratureSummary(e.target.value)}
                className={`${styles.input} ${
                  errors.summary ? styles.errorInput : ""
                }`}
                rows={10}
                maxLength={2001}
              />
              <div>
                {literatureSummary.length}/2000
              </div>
            </div>
            <button className={styles.upload} onClick={handleSubmit}>
              Upload
            </button>
            {err && <p className={styles.error}>{err}</p>}
            {message && <p className={styles.success}>{message}</p>}
          </div>
    </div>
  );
}
