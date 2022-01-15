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
import AttachToPM from "./features/pages/AttachToPM";
import ContactUs from "./features/pages/ContactUs";
import ProofConcept from "./features/pages/ProofConcept";
import News from "./features/pages/News";
import GridListHome from "../src/features/molecules/GridListHome";
import SupportUs from "../src/features/pages/SupportUs"
import {
  Routes,
  Route
} from "react-router-dom";
import Web3 from "web3";

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
            <Route path="/ContactUs" element={  <ContactUs/> }/>
            <Route path="/SupportUs" element={  <SupportUs/> }/>
            <Route path="/ProofConcept" element={  <ProofConcept/> }/>
            <Route path="/News" element={  <News/> }/>
        </Routes>
          <GridListHome/>
        <Footer/>
      </div>

  );
}

export default App;
