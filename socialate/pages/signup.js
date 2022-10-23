import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from "react";
import isValid, { validatePassword, validateName } from '../validation/isValid'

export default function SignUp() {

  const [errors, setErrors] = useState([]);

  //Process registration
  const registerUser = async (e) => {

    e.preventDefault();

    //Clear errors
    setErrors([]) // display errors

    //base64 password encryption and validation
    let password = e.target.password.value;
    let first_name = e.target.First_Name.value;
    let last_name = e.target.Last_Name.value;

    const validation = validatePassword(password);
    const validationFirst_Name = validateName(first_name);
    const validationLast_Name = validateName(last_name);

    if(validation && validationFirst_Name && validationLast_Name){
      password = Buffer.from(password, "utf8");
      password = password.toString("base64");
      //Fetch API
      //Post data
      const registration = await fetch ('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: password,
            first_name:e.target.First_Name.value,
            last_name:e.target.Last_Name.value,
          })
      })
      .then((res) => res.text())
      .then(data => console.log(data))
      
    }

    else{
      //Customize errors
      if(!(validationFirst_Name) || !(validationLast_Name)){
        setErrors(['Name should be longer than 2 character']) // display errors
      }
      else if(!validation){
        setErrors(['Password should be at least 8 characters long and contain 1 upper case letter!']) // display errors 
      }

      else{
        setErrors([])
      }
     
    }

    
  }

  // UI
  return (
    <div className={styles.container}>
        <Head>
          <title>Registration</title>
          <link rel="shortcut icon" href="images/favicon.png" />
        </Head>
      <h1>Socialates</h1>
      <h3>Stay Social</h3>
      <h2>Sign Up</h2>
      <main className={styles.main}>
        <div className={styles.errors}>
          {(errors.length > 0)? <ul>
            {errors.map(el => <li key={el}>{el}</li>)}
          </ul> : ''}
        </div>
        <form onSubmit={registerUser}>
          <label htmlFor = "username">Username</label>
          <input type="text" required placeholder='Type here...' name = "username" id ="username" autoComplete='true'></input>

          <label htmlFor='First_Name'>First Name</label>
          <input type="text" required placeholder='John' name = "First_Name" id ="First_Name"  autoComplete='true'></input>

          <label htmlFor = "Last_Name">Last Name</label>
          <input type="text" required placeholder='Doe' name = "Last_Name" id ="Last_Name"  autoComplete='true'></input>

          <label htmlFor = "password">Password</label>
          <input type="password" required name = "password" id ="password" placeholder='●●●●●'  autoComplete='true'></input>

          <input type ="submit" value = "Register"></input>
          <p>Have an account? <Link href = "/">Login!</Link></p>
        </form> 
      </main>

    </div>

  )
}

