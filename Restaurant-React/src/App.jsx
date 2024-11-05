import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Reservation from './Components/Reservation'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookingConfirmed from './Components/BookingConfirmed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Reservation/>}/>
          <Route path='/booking-confirmed' element={<BookingConfirmed/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
