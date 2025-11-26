"use client";
import styles from "@/styles/clinician/clinicianLlmBox.module.css"
import ClinicianTabs from "@/components/clinician/llmQuery/ClinicianTabs"
import { useEffect, useState } from "react";
import axios from "axios";
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { CircularProgress } from "@mui/material";

// type StatusType = "upload" | "prompt" | "submission" | "reportAction" | "literature";
type StatusType = "upload" | "prompt" | "submission" | "reportAction";

export default function ClinicianLlmBox() {
  const [generatedReport, setGeneratedReport] = useState<any>();

  const truncate = (str: string, max = 20) =>
  str.length > max ? str.slice(0, max) + "..." : str;

  // keeps track of what status the user is in for ehr uload
  const [actionStatus, setActionStatus] = useState<StatusType>("upload");

  // file upload
  // const [file, setFile] = useState<any | null>(null);
  const [prompt, setPrompt] = useState("");
  const [ehrIdSelected, setEhrIdSelected] = useState<any | null>(null);


  // loading
  const [loading, setLoading] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        EHR Query Document Generation
      </div>
      {loading
      ?  <div className={styles.middleContent}> <CircularProgress sx={{color: "#fafafa92"}}/></div>
      :
        <>
          <div className={styles.middleContent}>
            {actionStatus === "upload" ? (
              <div className={styles.midContentTitle}>
                Please upload a EHR file!
              </div>
            ) : actionStatus === "prompt" ? (
              ehrIdSelected ? (
                <>
                  <div className={styles.fileUploadTagContainer}>
                    <div className={styles.fileUploadTagContainer}>
                      <div className={styles.fileName}>
                        <DescriptionIcon/>&nbsp;&nbsp;<span>Patient EHR Selected</span>
                      </div>
                      <div className={styles.fileAction}>
                        <CheckCircleIcon
                          style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <br/><br/>
                  <div className={styles.midContentTitle}>
                    File Uploaded! Please select a prompt
                  </div>
                </>
              ) : (
                <p>No file uploaded yet.</p>
              )
            )
            : actionStatus === "submission" ? (
                <>
                    <div className={styles.fileUploadTagContainer}>
                      <div className={styles.fileUploadTagContainer}>
                        <div className={styles.fileName}>
                          <DescriptionIcon/>&nbsp;&nbsp;<span>Patient EHR Selected</span>
                        </div>
                        <div className={styles.fileAction}>
                          <CheckCircleIcon
                            style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className={styles.fileUploadTagContainer}>
                      <div className={styles.fileUploadTagContainer}>
                        <div className={styles.fileName}>
                          <QuestionMarkIcon/>&nbsp;&nbsp;<span>{prompt}</span>
                        </div>
                        <div className={styles.fileAction}>
                          <CheckCircleIcon
                            style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <br/><br/>
                    <div className={styles.midContentTitle}>
                        You may now submit your request!
                    </div>
                </>
            ) : actionStatus === "reportAction" ? (
              <div className={styles.midContentPdf}>
                <iframe
                  src={generatedReport?.file_url}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title="PDF Viewer"
                />
              </div>
            ) : null}



          </div>
          <div className={styles.tabs}>
            <ClinicianTabs actionStatus={actionStatus} setActionStatus={setActionStatus} setPrompt={setPrompt} prompt={prompt} setEhrIdSelected={setEhrIdSelected} ehrIdSelected={ehrIdSelected} setGeneratedReport={setGeneratedReport} generatedReport={generatedReport} setLoading={setLoading}/>
          </div>
        </>
      }
      {/* <div className={styles.middleContent}>
        {actionStatus === "upload" ? (
          <div className={styles.midContentTitle}>
            Please upload a EHR file!
          </div>
        ) : actionStatus === "prompt" ? (
          ehrIdSelected ? (
            <>
              <div className={styles.fileUploadTagContainer}>
                <div className={styles.fileUploadTagContainer}>
                  <div className={styles.fileName}>
                    <DescriptionIcon/>&nbsp;&nbsp;<span>Patient EHR Selected</span>
                  </div>
                  <div className={styles.fileAction}>
                    <CheckCircleIcon
                      style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                    />
                  </div>
                </div>
              </div>
              <br/><br/>
              <div className={styles.midContentTitle}>
                File Uploaded! Please select a prompt
              </div>
            </>
          ) : (
            <p>No file uploaded yet.</p>
          )
         )
        : actionStatus === "submission" ? (
            <>
                <div className={styles.fileUploadTagContainer}>
                  <div className={styles.fileUploadTagContainer}>
                    <div className={styles.fileName}>
                      <DescriptionIcon/>&nbsp;&nbsp;<span>Patient EHR Selected</span>
                    </div>
                    <div className={styles.fileAction}>
                      <CheckCircleIcon
                        style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                      />
                    </div>
                  </div>
                </div>
                <br/>
                <div className={styles.fileUploadTagContainer}>
                  <div className={styles.fileUploadTagContainer}>
                    <div className={styles.fileName}>
                      <QuestionMarkIcon/>&nbsp;&nbsp;<span>{prompt}</span>
                    </div>
                    <div className={styles.fileAction}>
                      <CheckCircleIcon
                        style={{ color: '#2c9966', fontSize: 35,  position: "relative", bottom: "-2px" }}
                      />
                    </div>
                  </div>
                </div>
                <br/><br/>
                <div className={styles.midContentTitle}>
                    You may now submit your request!
                </div>
            </>
        ) : actionStatus === "reportAction" ? (
          <div className={styles.midContentPdf}>
            <iframe
              src={generatedReport?.file_url}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          </div>
        ) : null}



      </div>
      <div className={styles.tabs}>
         <ClinicianTabs actionStatus={actionStatus} setActionStatus={setActionStatus} setPrompt={setPrompt} prompt={prompt} setEhrIdSelected={setEhrIdSelected} ehrIdSelected={ehrIdSelected} setGeneratedReport={setGeneratedReport} generatedReport={generatedReport} setLoading={setLoading}/>
      </div> */}

    </div>
  );
}
