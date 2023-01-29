import React from 'react'
import InputControl from '../InputControl/InputControl';
import {Camera, LogOut} from "react-feather";
import styles from './Account.module.css';

const Account = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.heading}>
                Welcome <span>User</span>
            </p>
            <div className={styles.logout}>
                <LogOut />
            </div>
        </div>

        <div className={styles.section}>
            <div className={styles.title}>Your Profile</div>
            <div className={styles.profile}>
                <div className={styles.left}>
                    <div className={styles.image}>
                        <img src="#" alt="Profile Image" />
                        <Camera />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.row}>
                        <InputControl label="Name" />
                        <InputControl label="Title" placeholder="e.g. MERN Developer" />
                    </div>
                    <div className={styles.row}>
                        <InputControl label="GitHub" placeholder="Enter your GitHub ID" />
                        <InputControl label="LinkedIn" placeholder="Enter your LinkedIn ID" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account