import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className={styles.container}>
      <h1>Socialates</h1>
      <h3>Stay Social</h3>
      <h2>Sign Up</h2>
      <main className={styles.main}>
        <form>
          <label for = "username">Username</label>
          <input type="text" required placeholder='Type here...' name = "username" id ="username"></input>
          <label for = "password">Password</label>
          <input type="password" required name = "password" id ="password" placeholder='●●●●●'></input>
          <input type ="submit" value = "Login"></input>
          <p>Have an account? <Link href = "/">Login!</Link></p>
        </form> 
      </main>

    </div>

  )
}
