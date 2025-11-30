"use client";
import styles from "@/styles/researcher/researcherTabs.module.css";
import { useEffect, useRef, useState } from "react";
import { Modal, Box } from "@mui/material";
import config from "../../../../config";
import AttachLiteratureModal from "./AttachLiteratureModal";

export default function ResearcherTabs({ actionStatus, setActionStatus, setPrompt, prompt, setLiteratureIdSelected, literatureIdSelected, setGeneratedReport, generatedReport, setLoading}: {actionStatus: any, setActionStatus: any, setPrompt: any, prompt: string, setLiteratureIdSelected: any, literatureIdSelected: any, setGeneratedReport: any, generatedReport: any, setLoading: any}) {

    const handleCancelUpload = () => {
        setLiteratureIdSelected(null);
        setActionStatus("upload");
        setPrompt(null)
    };
    console.log(prompt)
    console.log(literatureIdSelected)


    const handleSubmit = async () => {
        if (!literatureIdSelected) {
            alert("Please upload a PDF");
            return;
        }


        const payload = {
            prompt: prompt == "Resource Links" ? "Provide resourses similar to this literature (links, books and more)" : prompt,
            docId: literatureIdSelected
        };
        let success = false;
        try {
            setLoading(true)
            const res = await fetch(`${config.BASE_URL}/api/llmQueries/llmQueryLiterature.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log("LLM Response:", data);
            setGeneratedReport(data)
            if (data.reply) {
                setActionStatus("reportAction");
                console.log("Model Output:", data.reply);
                success = true
            } else {
                setActionStatus("prompt");
                console.error("LLM error:", data.error || data);
                success = false
            }

        } catch (err) {
            success = false
            setActionStatus("prompt");
            console.error("Network error:", err);
        } finally {
            setLoading(false)
        }
        setTimeout(() => {
            alert(success ? "Report Generated successfully!" : "Failed");
        }, 200);

    };

    function showReportPreview() {

    }

    // add literature modal functions
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.fadeWrapper}>
            <div
                className={`${styles.fadeItem} ${actionStatus === "upload" ? styles.show : styles.hide}`}
            >
                <div className={styles.container}>
                    <div className={styles.text1}>
                        Summarise
                    </div>
                    <div className={styles.text1}>
                        Resource Links
                    </div>
                    <div className={styles.highlightedTabsSingle} onClick={() => setOpen(true)}>
                       <label
                            className={styles.text2}
                        >
                            Upload Literature
                        </label>
                    </div>
                </div>
            </div>

            <div
                className={`${styles.fadeItem} ${actionStatus === "prompt" ? styles.show : styles.hide}`}
            >
                <div className={styles.containerSelect}>
                    <div className={styles.highlightedTabsSelect}>
                        <div
                            className={styles.text1select}
                            onClick={() => {
                                setActionStatus("submission");
                                setPrompt("Summarise");
                            }}
                        >
                            Summarise
                        </div>
                        <div
                            className={styles.text1select}
                            onClick={() => {
                                setActionStatus("submission");
                                setPrompt("Resource Links");
                            }}
                        >
                            Resource Links
                        </div>
                    </div>

                    <div className={styles.highlightedTabCancel} onClick={handleCancelUpload}>
                        <div
                            className={styles.text2select}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${styles.fadeItem} ${actionStatus === "submission" ? styles.show : styles.hide}`}
            >
                <div className={styles.containerSelect}>
                    <div className={styles.highlightedTabsSelect}>
                        <div
                            className={styles.text1select}
                            onClick={handleSubmit}
                        >
                            Submit
                        </div>
                    </div>

                    <div className={styles.highlightedTabCancel} onClick={() => { setActionStatus("prompt") }}>
                        <div
                            className={styles.text2select}
                        >
                            Back
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`${styles.fadeItem} ${actionStatus === "reportAction" ? styles.show : styles.hide}`}
            >
                <div className={styles.containerSelect}>
                    <div className={styles.highlightedTabsSelect} onClick={showReportPreview}>
                        <div className={styles.text1select}>
                           <a
                                href={generatedReport?.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#ffffffff"
                                }}
                            >
                                Download Report
                            </a>
                        </div>
                    </div>

                    <div className={styles.highlightedTabCancel}>
                        <div className={styles.text2select} onClick={() => setActionStatus("upload")}>
                            Done
                        </div>
                    </div>
                </div>
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
                    <AttachLiteratureModal setOpen={setOpen} setActionStatus={setActionStatus} setLiteratureIdSelected={setLiteratureIdSelected}/>
                </Box>
            </Modal>
        </div>
    );
}
