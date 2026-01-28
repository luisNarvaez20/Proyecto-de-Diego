'use client'

import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/principal');
  }, [router]);

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <h1>Helios</h1>
      </div>
    </main>
  );
}