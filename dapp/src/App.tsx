import React from 'react';
import './App.css';
import Navbar from "./features/molecules/Navbar";
import Footer from "./features/molecules/Footer";

import Home from "./features/pages/Home";
import Analytics from "./features/pages/Analytics";
import CreatePM from "./features/pages/CreatePM";
import ValidatePM from "./features/pages/ValidatePM";
import SearchPM from "./features/pages/SearchPM";
import AboutUs from "./features/pages/AboutUs";

import {
  Routes,
  Route
} from "react-router-dom";
import AttachToPM from "./features/pages/AttachToPM";

function App() {
  return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
            <Route path="/Analytics" element={  <Analytics/> }/>
            <Route path="/Create" element={  <CreatePM/> }/>
            <Route path="/Validate" element={  <ValidatePM/> }/>
            <Route path="/Search" element={  <SearchPM/> }/>
            <Route path="/Attach" element={  <AttachToPM/> }/>
            <Route path="/AboutUs" element={  <AboutUs/> }/>
        </Routes>
        <Footer/>
      </div>

  );
}

export default App;
