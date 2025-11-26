import Image from "next/image";
import styles from "@/styles/loading.module.css";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

interface LoginPageProps {
  setLoggedInUser: any;
}

export default function Loading() {

    return (
        <div className={styles.body}>
            <CircularProgress sx={{ color: 'white' }} />
        </div>

  );
}
