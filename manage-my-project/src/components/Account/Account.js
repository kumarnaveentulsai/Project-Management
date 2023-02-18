import React, { useRef, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, uploadImage, updateUserDatabase } from '../../firebase';
import InputControl from '../InputControl/InputControl';
import {Camera, LogOut} from "react-feather";
import styles from './Account.module.css';

const Account = (props) => {

const userDetails = props.userDetails;
const isAuthenticated = props.auth;
// const navigate = useNavigate();
const imagePicker = useRef()

const [progress, setProgress] = useState(0);
const [profileImageUploadStart, setProfileImageUploadStart] = useState(false);
const [profileImageUrl, setProfileImageUrl] = useState("");

const [userProfileValues, setUserProfileVales] = useState({
    name: userDetails.name || "",
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
})

const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

const [errorMessage, setErrorMessage] = useState("");

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
        updateProfileImageToDatabase(url);
        setProfileImageUploadStart(false);
        setProgress("");
    },
    (err) => {
        console.error("Error -> ", err);
        setProfileImageUploadStart(false);
    })
    console.log(file);
}

const handleInputChange = (event, property)=> {
    setShowSaveDetailsButton(true);
    setUserProfileVales((prev) => ({
        ...prev,
        [property]:event.target.value
    }))
}

const updateProfileImageToDatabase = async (url) => {
    await updateUserDatabase({...userProfileValues, profileImageUrl:url}, userDetails.uid);
}

const saveDetailsToDatabase = async() => {
    if(!userProfileValues.name){
        setErrorMessage("Name Required");
        return;
    }
    setSaveButtonDisabled(true);
    await updateUserDatabase({...userProfileValues}, userDetails.uid);
    setSaveButtonDisabled(false);
    setShowSaveDetailsButton(false);
}

  return isAuthenticated ?(
    <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.heading}>
                Welcome <span>{userProfileValues.name}</span>
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
                        <div className={styles.camera} onClick={handleCameraClick}>
                            <Camera />
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
                        <InputControl label="Name" placeholder="Enter your Name" value={userProfileValues.name} onChange={(event)=> handleInputChange(event, "name")} />

                        <InputControl label="Title" placeholder="e.g. MERN Developer" value={userProfileValues.designation} onChange={(event)=> handleInputChange(event, "designation")} />

                    </div>
                    <div className={styles.row}>
                        <InputControl label="GitHub" placeholder="Enter your GitHub ID" value={userProfileValues.github} onChange={(event)=> handleInputChange(event, "github")} />

                        <InputControl label="LinkedIn" placeholder="Enter your LinkedIn ID" value={userProfileValues.linkedin} onChange={(event)=> handleInputChange(event, "linkedin")} />
                    </div>

                    <div className={styles.footer}>
                        <p className={styles.error}>{errorMessage}</p>
                    </div>

                    {
                        showSaveDetailsButton && (
                            <button disabled={saveButtonDisabled} className={"button"} onClick={saveDetailsToDatabase}>Save Details</button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    </div>
  ):( <Navigate to="/" />)
}

export default Account