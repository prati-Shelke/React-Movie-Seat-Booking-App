
import React from "react"
import Home from "./components/Home"
import Booked from "./components/Booked"
import Summary from "./components/Summary";
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';

function App()
{

 
  return (
      
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to ="/Home" />}/>
        <Route path="/Home" element={<Home />} />
        <Route path="/Confirm" element={<Booked/>} />
        <Route path="/Summary" element={<Summary/>} />
      </Routes>
    </Router>
  )
}

export default App
  


