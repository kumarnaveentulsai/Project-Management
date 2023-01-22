import React from 'react'
import styles from './Auth.module.css'
import InputControl from '../InputControl/InputControl.js'
import { Link } from 'react-router-dom'

const Auth = (props) => {
    const isSignup = props.signup ? true : false;
    // now in this isSignup boolean it will be stored like which data needs to be get rendered whether it is of signup or login
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <p className={styles.smallLink}>{"Back to home"}</p>
        <p className={styles.heading}>{isSignup ? "Signup" : "Login"}</p>

        {isSignup &&
          (<InputControl label="Name" placeholder="Enter your name" />)
        }
        
        <InputControl label="Email" placeholder="Enter your email" />
        <InputControl label="Password" placeholder="Enter your password" isPassword />
        <p className={styles.error}>This is an error</p>
        <button> {isSignup ? "Signup" : "Login"} </button>
        {/* <InputControl label={"password"} isPassword /> */}

        <div className={styles.bottom}>
        {isSignup ? <p>Already have an account ? <Link>Login here</Link></p> : <p>New User ? <Link>Create an Account</Link></p>}
        </div>
      </form>
    </div>
  )
}

export default Auth