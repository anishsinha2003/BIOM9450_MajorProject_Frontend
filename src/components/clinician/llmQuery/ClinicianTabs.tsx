"use client";
import styles from "@/styles/tabs.module.css";
import { useEffect, useRef, useState } from "react";
import { Modal, Box } from "@mui/material";
import AttachEhrModal from "./AttachPatientRecordModal";
import config from "../../../../config";
// import AddLiteratureModal from "./AddLiteratureModal";

export default function ClinicianTabs({ actionStatus, setActionStatus, setPrompt, prompt, setEhrIdSelected, ehrIdSelected, setGeneratedReport, generatedReport, setLoading}: {actionStatus: any, setActionStatus: any, setPrompt: any, prompt: string, setEhrIdSelected: any, ehrIdSelected: any, setGeneratedReport: any, generatedReport: any, setLoading: any}) {


    const handleCancelUpload = () => {
        setEhrIdSelected(null);
        setActionStatus("upload");
        setPrompt(null)
    };

    const handleSubmit = async () => {
        if (!ehrIdSelected) {
            alert("Please upload a PDF");
            return;
        }
        const payload = {
            prompt: prompt,
            ehrId: ehrIdSelected
        };
        let success = false;
        try {
            setLoading(true)
            const res = await fetch(`${config.BASE_URL}/api/llmCall.php`, {
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
    console.log(generatedReport)
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
                        Likely Diagnosis?
                    </div>
                    <div className={styles.text1}>
                        Treatment Options?
                    </div>
                    <div className={styles.text1}>
                        Another one idk?
                    </div>
                    <div className={styles.highlightedTabsSingle} onClick={() => setOpen(true)}>
                       <label
                            className={styles.text2}
                        >
                            Upload EHR
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
                                setPrompt("Likely Diagnosis");
                            }}
                        >
                            Likely Diagnosis?
                        </div>
                        <div
                            className={styles.text1select}
                            onClick={() => {
                                setActionStatus("submission");
                                setPrompt("Treament Options");
                            }}
                        >
                            Treatment Options?
                        </div>
                        <div
                            className={styles.text1select}
                            onClick={() => {
                                setActionStatus("submission");
                                setPrompt("3");
                            }}
                        >
                            Another one idk?
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
                    <AttachEhrModal setOpen={setOpen} setActionStatus={setActionStatus} setEhrIdSelected={setEhrIdSelected}/>
                </Box>
            </Modal>
        </div>
    );
}
