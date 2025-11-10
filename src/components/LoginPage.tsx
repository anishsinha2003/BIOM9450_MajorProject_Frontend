import Image from "next/image";
import styles from "@/styles/loginPage.module.css";
import { useState } from "react";
import logo from "../../public/logo.png";
interface LoginPageProps {
  role: any;
  username: any;
  password: any;
  setLoggedIn: any;
  setRole: any;
}

export default function LoginPage({ role, username, password, setLoggedIn, setRole }: LoginPageProps) {
    const handleLogin = async (e: any) => {
        e.preventDefault();

        // also send the role as a parameter so the person can be correcly
        // identified as either a researcher or a clinician
        const res = await fetch("http://localhost/your-backend-folder/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
        });


        const data = await res.json();
        if (!res.ok) {
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
        }

        setLoggedIn(true)
    };

    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { name: "Clinician"},
        { name: "Researcher"}
    ];

    const [credType, setCredType] = useState('login')
    return (
        <div className={styles.body}>
            <div
                className={credType === "signup" ? styles.middleContainerSignUp : styles.middleContainerLogIn}
            >
                <div
                    className={styles.gradient}
                    style={{
                        opacity: activeTab === 0 ? 1 : 0,
                        background: "linear-gradient(to bottom right, #3e69ea, #1337a1)"
                    }}
                />
                <div
                    className={styles.gradient}
                    style={{
                        opacity: activeTab === 0 ? 0 : 1,
                        background: "linear-gradient(to bottom right, #3C6E71, #0d5255)"
                    }}
                />

                <div className={styles.tabsContainer}>
                    <div className={styles.tabs}>
                        {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
                            onClick={() => {
                                setActiveTab(index)

                                if (index === 0) setRole("clinician");
                                else setRole("researcher");
                            }}
                        >
                            {tab.name}
                        </div>
                        ))}
                        <div
                        className={styles.glider}
                        style={{
                            transform: `translateX(${activeTab * 100}%)`,
                            backgroundColor: activeTab === 0 ? "#2676f744" : "#4f979b81",
                        }}
                        ></div>
                    </div>
                </div>
                <br/><br/><br/><br/><br/>
                <div className={styles.contentContainer}>
                    {credType === "login"
                    ?
                        <>
                            <div>
                                <img src="/logo.png" alt="Logo" width="150" />
                            </div>
                            <br/>
                            <div className={styles.title2}>
                                Log in or Sign up as a {tabs[activeTab].name} or toggle the tabs above to change the role
                            </div>
                            <br/><br/><br/>
                            <input className={styles.input} placeholder="Username"/>
                            <br/>
                            <input type="password" className={styles.input} placeholder="Password"/>
                            <br/><br/>
                            <div className={styles.buttonContainer}>
                                <div className={styles.button} onClick={() => setLoggedIn(true)}>Log In</div>
                                <span className={styles.buttonBelowText}>Don’t Have an Account? <span className={styles.button2} onClick={() => setCredType("signup")}>Sign Up</span></span>
                            </div>
                        </>
                    :
                        <>
                            <div>
                                <img src="/logo.png" alt="Logo" width="150" />
                            </div>
                            <br/>
                            <div className={styles.title2}>
                                Log in or Sign up as a {tabs[activeTab].name} or toggle the tabs above to change the role
                            </div>
                            <br/><br/><br/>
                            <input className={styles.input} placeholder="Name"/>
                            <br/>
                            <input className={styles.input} placeholder="Last Name"/>
                            <br/>
                            <input className={styles.input} placeholder="Username"/>
                            <br/>
                            <input type="password" className={styles.input} placeholder="Password"/>
                            <br/>
                            <input type="password" className={styles.input} placeholder="Confirm Password"/>
                            <br/><br/>
                            <div className={styles.buttonContainer}>
                                <div className={styles.button} onClick={() => setLoggedIn(true)}>Sign Up</div>
                                <span className={styles.buttonBelowText}>Already Have an Account? <span className={styles.button2} onClick={() => setCredType("login")}>Log In</span></span>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>

  );
}
