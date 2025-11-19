import Image from "next/image";
import styles from "@/styles/loginPage.module.css";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";

interface LoginPageProps {
  setLoggedInUser: any;
}

export default function LoginPage({ setLoggedInUser }: LoginPageProps) {
    const router = useRouter();

    // ROLE TAB
    const [role, setRole] = useState("researcher")
    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        { name: "Clinician", value: "clinician" },
        { name: "Researcher", value: "researcher" },
    ];

    // SIGNUP FORM STATE
    const [signupName, setSignupName] = useState("");
    const [signupLastName, setSignupLastName] = useState("");
    const [signupUser, setSignupUser] = useState("");
    const [signupPass, setSignupPass] = useState("");
    const [signupConfirmPass, setSignupConfirmPass] = useState("");

    // LOGIN FORM STATE
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const [credType, setCredType] = useState('login')

    // LOGIN FUNCTION
    const handleLogin = async () => {

        try {
        const res = await fetch("http://localhost:8000/api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: username,
                password,
                role: role
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Login failed");
            return;
        }
        setLoggedInUser({
            name: data.user.name,
            lastName: data.user.lastName,
            email: data.user.username,
            role: data.user.role,
        });
        clearFields();
        console.log("User logged in:", data.user);
        } catch (err) {
        console.error("Error logging in:", err);
        }
    };

    // SIGNUP FUNCTION
    const handleSignup = async () => {
        try {
        const res = await fetch("http://localhost:8000/api/signup.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: signupName,
                lastName: signupLastName,
                username: signupUser,
                password: signupPass,
                confirmPassword: signupConfirmPass,
                role: role
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Signup failed");
            return;
        }

        alert("Signup successful! Logging you in...");
        setLoggedInUser({
            name: data.user.name,
            lastName: data.user.lastName,
            email: data.user.username,
            role: data.user.role,
        });

        clearFields();
        console.log("User signed up:", data.user);
        } catch (err) {
        console.error("Error signing up:", err);
        }
    };

    function handleSignupButton() {
        clearFields();
        setCredType("signup");
    }

    function handleLoginButton() {
        clearFields();
        setCredType("login");

    }

    function clearFields() {
        console.log("ADXIn")
        setSignupName("");
        setSignupLastName("");
        setSignupUser("");
        setSignupPass("");
        setSignupConfirmPass("");
        setPassword("");
        setUsername("");
    }

    return (
        <div className={styles.body}>
            <div className={styles.homeButton}  onClick={() => router.push("/")}>
                <HomeIcon
                    sx={{
                        fontSize: 40,
                        color: 'white',
                        opacity: 0.5,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                        opacity: 1,
                        },
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div
                className={credType === "signup" ? styles.middleContainerSignUp : styles.middleContainerLogIn}
            >
                <div
                    className={styles.gradient}
                    style={{
                        opacity: activeTab === 0 ? 1 : 0,
                        background: "linear-gradient(to bottom right, #3C6E71, #0d5255)"
                    }}
                />
                <div
                    className={styles.gradient}
                    style={{
                        opacity: activeTab === 0 ? 0 : 1,
                        background: "linear-gradient(to bottom right, #3e69ea, #1337a1)"
                    }}
                />

                <div className={styles.tabsContainer}>
                    <div className={styles.tabs}>
                        {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
                            onClick={() => {
                                setActiveTab(index);
                                clearFields();
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
                            backgroundColor: activeTab === 0 ? "#4f979b81" : "#2676f744",
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
                            <input id="loginUsername" value={username} className={styles.input} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                            <br/>
                            <input id="loginPassword" value={password} type="password" className={styles.input} placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
                            <br/><br/>
                            <div className={styles.buttonContainer}>
                                <div className={styles.button} onClick={handleLogin}>Log In</div>
                                <span className={styles.buttonBelowText}>Don’t Have an Account? <span className={styles.button2} onClick={handleSignupButton}>Sign Up</span></span>
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
                            <input id="signupName" value={signupName} className={styles.input} placeholder="Name" onChange={(e) => setSignupName(e.target.value)}/>
                            <br/>
                            <input id="signupLastname" value={signupLastName} className={styles.input} placeholder="Last Name" onChange={(e) => setSignupLastName(e.target.value)}/>
                            <br/>
                            <input id="signupUsername" value={signupUser} className={styles.input} placeholder="Username" onChange={(e) => setSignupUser(e.target.value)}/>
                            <br/>
                            <input type="password" id="signupPassword" value={signupPass} className={styles.input} placeholder="Password" onChange={(e) => setSignupPass(e.target.value)}/>
                            <br/>
                            <input type="password" id="signupConfirmPassword" value={signupConfirmPass} className={styles.input} placeholder="Confirm Password" onChange={(e) => setSignupConfirmPass(e.target.value)}/>
                            <br/><br/>
                            <div className={styles.buttonContainer}>
                                <div className={styles.button} onClick={handleSignup}>Sign Up</div>
                                <span className={styles.buttonBelowText}>Already Have an Account? <span className={styles.button2} onClick={handleLoginButton}>Log In</span></span>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>

  );
}
