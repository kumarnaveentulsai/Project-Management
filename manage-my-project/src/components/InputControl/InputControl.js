import React, {useState} from 'react'
import { Eye, EyeOff } from 'react-feather';
import styles from './InputControl.module.css'

const InputControl = ({label, isPassword, ...props}) => {
  const [isVisible, setIsVisisble] = useState(true);

  return (
    <div className={styles.container}>
       {label && <label>{label}</label>}
       <div className={styles.inputContainer}>
        <input type={isPassword ? (isVisible ? "password" : "text") : "text"} {...props} />
        {isPassword && 
          <div className={styles.icon}>
            {isVisible ? <EyeOff onClick={() =>setIsVisisble(prev=>!prev)} /> : <Eye onClick={() =>setIsVisisble(prev=>!prev)} />}
          </div>
        }
       </div>
    </div>
  )
}

export default InputControl