import React from 'react';
import './App.css';
import Home from "./features/pages/Home";
import Navbar from "./features/molecules/Navbar";
import Footer from "./features/molecules/Footer";
import Mint from "./features/pages/Mint";
import {
  Routes,
  Route
} from "react-router-dom";



function App() {
  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
            <Route path="/mint" element={  <Mint/> }/>

        </Routes>
        <Footer/>
      </div>

  );
}

export default App;
