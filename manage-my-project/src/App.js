import {React, useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account'
import { auth, getUserDatabase } from './firebase';
import Spinner from './components/Spinner/Spinner'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({})
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const fetchUserDetails = async(uid) => {
    const userDetails = await getUserDatabase(uid);
    setUserDetails(userDetails);
    setIsDataLoaded(true);
  }

  useEffect(() => {
    const listener = auth.onAuthStateChanged(user => {
      if(!user) {
        setIsDataLoaded(true);
        return;
      }
      setIsAuthenticated(true);
      fetchUserDetails(user.uid)
    })
    return () => listener();
  }, [])

  return (
    <div className='App'>
    <Router>
      {isDataLoaded ? 
          (<Routes>
            <Route path='/' element={<Home auth={isAuthenticated} />} />
            {
              !isAuthenticated && (
                <>
                <Route path='/login' element={<Auth />} />
                <Route path='/signup' element={<Auth signup />} />

                /* we will just pass a prop in a signup page and if its not passed means its a login page */
                </>
              )
            }
            <Route path='/account' element={<Account />} />
            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>
        ) : (
          <div className="spinner"><Spinner /></div>
        )}
    </Router>
    </div>
  )
}

export default App