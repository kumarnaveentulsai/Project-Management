import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, uploadImage } from '../../firebase';
import InputControl from '../InputControl/InputControl';
import {Camera, LogOut} from "react-feather";
import styles from './Account.module.css';

const Account = (props) => {

const userDetails = props.userDetails;
const isAuthenticated = props.auth;
// const navigate = useNavigate();
const imagePicker = useRef()

const [progress, setProgress] = useState(0);
const [profileImageUrl, setProfileImageUrl] = useState("");
const [profileImageUploadStart, setProfileImageUploadStart] = useState(false);

const handleLogout = async () => {
    await signOut(auth);
    // console.log(res);
    // navigate('/');
};

const handleCameraClick = () => {
    imagePicker.current.click();
}

const handleImageChange = (event) => {
    const file = event.target.files[0];

    if(!file) return;

    setProfileImageUploadStart(true);
    uploadImage(file, (progress) => {
        setProgress(progress);
    },
    (url) => {
        setProfileImageUrl(url);
        setProfileImageUploadStart(false);
        setProgress("");
    },
    (err) => {
        console.error("Error -> ", err);
        setProfileImageUploadStart(false);
    })
    console.log(file);
}

  return isAuthenticated ?(
    <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.heading}>
                Welcome <span>{userDetails.name}</span>
            </p>
            <div className={styles.logout} onClick={handleLogout} >
                <LogOut /> Logout
            </div>
        </div>

        <input type="file" style={{display: "none"}} ref={imagePicker} onChange={handleImageChange} />

        <div className={styles.section}>
            <div className={styles.title}>Your Profile</div>
            <div className={styles.profile}>
                <div className={styles.left}>
                    <div className={styles.image}>
                        <img src={profileImageUrl} alt="Profile" />
                        <div className={styles.camera}>
                            <Camera onClick={handleCameraClick} />
                        </div>
                    </div>
                    {profileImageUploadStart ? (<p className={styles.progress}>
                        {progress ===100 ? "Profile Updated Successfully" :
                        `${progress.toFixed(2)}% uploaded`}
                    </p>)
                    : ("")};
                    
                </div>
                <div className={styles.right}>
                    <div className={styles.row}>
                        <InputControl label="Name" placeholder="Enter your Name" />
                        <InputControl label="Title" placeholder="e.g. MERN Developer" />
                    </div>
                    <div className={styles.row}>
                        <InputControl label="GitHub" placeholder="Enter your GitHub ID" />
                        <InputControl label="LinkedIn" placeholder="Enter your LinkedIn ID" />
                    </div>
                    <button className={styles.saveButton}>Save Details</button>
                </div>
            </div>
        </div>
    </div>
  ):( <Navigate to="/" />)
}

export default Account