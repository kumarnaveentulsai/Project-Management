import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/signup' element={<Auth signup />} />
          {/* we will just pass a prop in a signup page and if its not passed means its a login page */}
          <Route path='/account' element={<h1>Login</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App