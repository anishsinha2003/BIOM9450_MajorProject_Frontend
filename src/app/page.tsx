"use client"

import HomePageClinician from "@/components/HomePageClinician";
import HomePageResearcher from "@/components/HomePageResearcher";
import LoginPage from "@/components/LoginPage";
import Image from "next/image";
import { useState } from "react";

export default function Home() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('clinician')
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      {!loggedIn
        ?
          <LoginPage role={role} username={username} password={password} setLoggedIn={setLoggedIn} setRole={setRole}/>
        : loggedIn && role == 'clinician' ?
          <HomePageClinician/>
        : loggedIn && role == 'researcher' ?
          <HomePageResearcher/>
        :
          <></>
      }

    </div>
  );
}
