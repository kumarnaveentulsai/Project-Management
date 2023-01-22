import React from 'react'
import {ArrowRight} from 'react-feather'
import {useNavigate} from 'react-router-dom';
import styles from './Home.module.css'
import homeScreen from '../../assets/home.png'

const Home = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/login');
    };
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.left}>
                <p className={styles.heading}>Personale Progetto Gestione</p>
                <p className={styles.subHeading}>One Place Destination for your Project Management</p>
                <button onClick={handleButton}>Get Started <ArrowRight /> </button>
            </div>
            <div className={styles.right}>
                <img src={homeScreen} alt='home' />
            </div>
        </div>
    </div>
  )
}

export default Home