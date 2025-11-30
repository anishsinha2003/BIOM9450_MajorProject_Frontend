"use client";

import styles from "@/styles/clinician/clinicianAddPatient.module.css";
import { useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from "@mui/material";
import config from "../../../../config";

export default function ClinicianAddPatientModal({setOpen, setUpdateTableFlag, updateTableFlag}: {setOpen: any, setUpdateTableFlag: any, updateTableFlag: any}) {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        dob: false,
        sex: false,
        ehr: false,
    });

    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        // erorr checks
        setErrors({ firstName: false, lastName: false, dob: false, sex: false, ehr: false });
        const fName = firstName.trim();
        const lName = lastName.trim();
        const dobValue = dob.trim();
        const sexValue = sex.trim();

        let hasError = false;
        const newErrors = { firstName: false, lastName: false, dob: false, sex: false, ehr: false };
        let errorMessage = ""

        // Check all fields required
        if (file === null) {
            newErrors.ehr = true;
            hasError = true;
        }
        if (!fName) {
            newErrors.firstName = true;
            hasError = true;
        }
        if (!lName) {
            newErrors.lastName = true;
            hasError = true;
        }
        if (!dobValue) {
            newErrors.dob = true;
            hasError = true;
        }
        if (!sexValue) {
            newErrors.sex = true;
            hasError = true;
        }
        if (hasError) {
            setErrors(newErrors);
            errorMessage = "All fields are required"
            alert(errorMessage);
            return
        }

        // Check names for spaces
        if (fName.includes(" ")) {
            newErrors.firstName = true;
            hasError = true;
            setErrors(newErrors);
            errorMessage = "First Name cannot include spaces"
        }
        if (lName.includes(" ")) {
            newErrors.lastName = true;
            hasError = true;
            setErrors(newErrors);
            errorMessage = "Last Name cannot include spaces"
        }

        // Check DOB validity
        const dobDate = new Date(dobValue);
        const now = new Date();
        const earliestDOB = new Date("1900-01-01");

        if (isNaN(dobDate.getTime()) || dobDate > now || dobDate < earliestDOB) {
            newErrors.dob = true;
            hasError = true;
            setErrors(newErrors);
            errorMessage = "Enter a valid date of birth"
        }

        // If any error, show alert and stop submission
        if (hasError) {
            setErrors(newErrors);
            alert(errorMessage);
            return;
        }


        // validate is done
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("dob", dob);
        formData.append("sex", sex);

        if (file) {
            formData.append("pdf", file);
        }

        let success = false;

        try {
            setLoading(true);
            const res = await fetch(`${config.BASE_URL}/api/patient/addPatient.php`, {
            method: "POST",
            body: formData,
            });

            // try to parse JSON, consider success only if res.ok
            if (res.ok) {
                const data = await res.json();
                success = true;
            }
            else {
                success = false;
            }
        } catch (e) {
            console.error(e);
            success = false;
        }

        // show alert after a short delay
        setTimeout(() => {
            setOpen(false)
            alert(success ? "Patient added successfully!" : "Failed to add patient!");
            setLoading(false);
            setUpdateTableFlag()
        }, 1000);
        };
    const [loading, setLoading] = useState(false)
    console.log(errors)
    return (
        <div className={styles.modalContainer}>
            {loading
                ?
                    <div style={{height: "595px", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}><CircularProgress sx={{color: "#fafafa92"}}/></div>
                :   <>
                        <div className={styles.close} onClick={() => setOpen(false)}>
                            <CloseIcon/>

                        </div>
                        <h2 className={styles.title}>Add New Patient</h2>
                        <div className={styles.formGrid}>
                            {/* First Name */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>First Name</label>
                                <input
                                    className={`${styles.input} ${errors.firstName ? styles.errorInput : ""}`}
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Last Name</label>
                                <input
                                    className={`${styles.input} ${errors.lastName ? styles.errorInput : ""}`}
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Date of Birth</label>
                                <input
                                    className={`${styles.input} ${errors.dob ? styles.errorInput : ""}`}
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Sex</label>
                                <select
                                    className={`${styles.input} ${errors.sex ? styles.errorInput : ""}`}
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.uploadSection}>
                            <label className={styles.label}>Upload File</label>

                            <div
                                className={`${styles.uploadBox} ${errors.ehr ? styles.uploadBoxError : ""}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {file ? (
                                    <span className={styles.fileName}>{file.name}</span>
                                ) : (
                                    <span className={styles.uploadText}>Click to upload</span>
                                )}
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={styles.hiddenInput}
                            />
                        </div>

                        {/* Submit Button */}
                        <button className={styles.submitBtn} onClick={handleSubmit}>
                            Add Patient
                        </button>
                    </>
            }
        </div>
    );
}
