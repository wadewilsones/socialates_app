import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
      <title>Socialates - your social app</title>
      <link rel="shortcut icon" href="images/favicon.png" />
    </Head>
      <h1>Socialates</h1>
      <h3>Stay Social</h3>
      <h2>Login</h2>
      <main className={styles.main}>
        <form>
          <label htmlFor = "username">Username</label>
          <input type="text" required placeholder='Type here...' name = "username" id ="username"  autoComplete='true'></input>
          <label htmlFor = "password">Password</label>
          <input type="password" required name = "password" id ="password" placeholder='●●●●●'  autoComplete='true'></input>
          <input type ="submit" value = "Login"></input>
          <p>Don't have an account? <Link href = "/signup">Sign up!</Link></p>
        </form>
         
      </main>

    </div>

  )
}
