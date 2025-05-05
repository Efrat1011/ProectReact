import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CourseProvider } from './context/CourseContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Gemini from './components/Gemini'
import MyCourses from './pages/MyCourses'
import './App.css'

 export default function App() {
  

  return (
    <BrowserRouter>
      <CourseProvider>
        <Layout>
         <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-courses" element={<MyCourses/>}/>
          </Routes>
          <Gemini/>
        </Layout>
      </CourseProvider>
    </BrowserRouter>
  )
}


