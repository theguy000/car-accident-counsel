import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AboutUs from './AboutUs'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
