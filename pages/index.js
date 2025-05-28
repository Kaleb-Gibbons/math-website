import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Math Website</title>
        <meta name="description" content="A mathematics learning platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Math Website</span>
        </h1>

        <p className={styles.description}>
          Your journey to mathematical excellence starts here
        </p>

        <div className={styles.grid}>
          <Link href="/question-generator" className={styles.card}>
            <h2>Question Generator &rarr;</h2>
            <p>Generate custom math problems with varying difficulty levels and topics.</p>
          </Link>

          <div className={styles.card}>
            <h2>Practice &rarr;</h2>
            <p>Test your knowledge with interactive exercises.</p>
          </div>

          <div className={styles.card}>
            <h2>Resources &rarr;</h2>
            <p>Access helpful tools and reference materials.</p>
          </div>

          <div className={styles.card}>
            <h2>Community &rarr;</h2>
            <p>Join our community of math enthusiasts.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Powered by Next.js and Vercel</p>
      </footer>
    </div>
  )
} 