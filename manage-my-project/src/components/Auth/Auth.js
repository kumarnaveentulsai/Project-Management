import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import InputControl from '../InputControl/InputControl.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';
import { updateUserDatabase } from '../../firebase'

const Auth = (props) => {
    const isSignup = props.signup ? true : false;
    // now in this isSignup boolean it will be stored like which data needs to be get rendered whether it is of signup or login

    const navigate = useNavigate();

    const [values, setvalues] = useState({
      name: "",
      email: "",
      password: "",
    })

    const [errorMsg, setErrorMsg] = useState("");

    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSignup = () => {
      if(!values.name || !values.email || !values.password){
        setErrorMsg("All fields are required");
        return;
      }

      setSubmitButtonDisabled(true);

      createUserWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
        const userId = res.user.uid;
        await updateUserDatabase({name: values.name, email: values.email}, userId);

        setSubmitButtonDisabled(false);
        navigate('/');
        console.log(res);
      }).catch(err => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      })
    }

    const handleLogin = () => {
      if(!values.email || !values.password){
        setErrorMsg("All fields are required");
        return;
      }

      setSubmitButtonDisabled(true);

      signInWithEmailAndPassword(auth, values.email, values.password).then(async () => {
        setSubmitButtonDisabled(false);
        navigate('/');
      }).catch(err => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      })
    }

    const handleSubmission = (event) => {
      event.preventDefault();

      if(isSignup)handleSignup();
      else handleLogin();
    }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmission} className={styles.form}>
        <p className={styles.smallLink}>
          <Link to="/">{"Back to home"}</Link>
        </p>
        <p className={styles.heading}>{isSignup ? "Signup" : "Login"}</p>

        {isSignup &&
        (<InputControl label="Name" placeholder="Enter your name" onChange={(event)=>setvalues((prev) => ({...prev, name: event.target.value}))} />)
        }
        
        <InputControl label="Email" placeholder="Enter your email" onChange={(event)=>setvalues((prev) => ({...prev, email: event.target.value}))} />

        <InputControl label="Password" placeholder="Enter your password" onChange={(event)=>setvalues((prev) => ({...prev, password: event.target.value}))}  isPassword />

        <p className={styles.error}>{errorMsg}</p>
        <button type="submit" disabled={submitButtonDisabled}> {isSignup ? "Signup" : "Login"} </button>
        {/* <InputControl label={"password"} isPassword /> */}

        <div className={styles.bottom}>
        {isSignup ? <p>Already have an account ? <Link to="/login">Login here</Link></p> : <p>New User ? <Link to="/signup">Create an Account</Link></p>}
        </div>
      </form>
    </div>
  )
}

export default Auth