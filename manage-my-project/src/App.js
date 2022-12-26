import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/signup' element={<h1>Login</h1>} />
          <Route path='/account' element={<h1>Login</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App