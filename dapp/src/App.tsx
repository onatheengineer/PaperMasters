import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';

import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footer";

import Home from "./components/pages/Home";
import Analytics from "./components/pages/Analytics";
import CreatePM from "./components/pages/CreatePM";
import ValidatePM from "./components/pages/ValidatePM";
import SearchPM from "./components/pages/SearchPM";
import AboutUs from "./components/pages/AboutUs";
import AttachToPM from "./components/pages/AttachToPM";
import ContactUs from "./components/pages/ContactUs";
import ProofConcept from "./components/pages/ProofConcept";
import News from "./components/pages/News";
import GridListHome from "./components/molecules/GridListHome";
import SupportUs from "./components/pages/SupportUs"
import {
  Routes,
  Route
} from "react-router-dom";
import {produce} from 'immer';
import Web3 from "web3";


function App() {

    // const Example = () => (
    //         <Planet size={200} mood="blissful" color="#FDA7DC" />
    //     )

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
