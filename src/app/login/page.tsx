"use client";

import LoginPage from "@/components/LoginPage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginRoute() {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user: any) => {
    setLoggedInUser(user);

    if (user.role === "clinician") router.push("/clinician");
    if (user.role === "researcher") router.push("/researcher");
  };

  return <LoginPage setLoggedInUser={handleLogin} />;
}
