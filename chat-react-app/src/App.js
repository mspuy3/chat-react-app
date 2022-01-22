import React, { useState } from 'react'
import { 
  BrowserRouter as Router,
  Route, 
  Routes } from "react-router-dom";


import LandingPage from './components/LandingPage/LandingPage'
import MainPage from './components/MainPage/MainPage';


const API_URL = 'https://slackapi.avionschool.com/api/v1'

function App() {


  return (
    <div className='bg-light'>
      <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route exact path="/landing" element={<LandingPage />} />
        <Route exact path="/main" element={<MainPage />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App