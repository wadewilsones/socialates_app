import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getCookies, setCookie, deleteCookie } from 'cookies-next';
//import { baseConvert }  from '../validation/isValid'
import { useRouter } from 'next/router'


export default function Home() {

  const router = useRouter();
  // Send data
  const log = (event) => {
    event.preventDefault();
    // convert to base64
    let password = Buffer.from(event.target.password.value, "utf8");
    password = password.toString("base64");

    const user = {
        username:event.target.username.value,
        password:password
    }

    fetch('api/auth', {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username:user.username,
        password:user.password,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.isLogged){
        setCookie('token', data.accessToken)  // Change to header authorization
        setCookie('user', data.id);
        //Redirect to profile
        router.push(`profile/${data.id}`)
      } 
      
    })
  }


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
        <form onSubmit={log}>
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
