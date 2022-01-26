import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footers/Footer";
import Home from "./components/pages/Home";
import Analytics from "./components/pages/Analytics";
import Create from "./components/pages/Create";
import Validate from "./components/pages/Validate";
import Search from "./components/pages/Search";
import AboutUs from "./components/pages/AboutUs";
import Attach from "./components/pages/Attach";
import ContactUs from "./components/pages/ContactUs";
import ProofConcept from "./components/pages/ProofConcept";
import News from "./components/pages/News";
import SupportUs from "./components/pages/SupportUs";
import Profile from "./components/pages/Profile";
import FAQ from "./components/pages/FAQ";
import PageCreateTemplate from './components/atoms/pageCreateTemplate';

import {
  Routes,
  Route
} from "react-router-dom";
import {produce} from 'immer';
import Web3 from "web3";
import SocialMediaLinksFooter from "./components/molecules/Footers/SocialMediaLinksFooter";



function App() {

    // const Example = () => (
    //         <Planet size={200} mood="blissful" color="#FDA7DC" />
    //     )

  return (
        <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>

            <Route path="/Create" element={<PageCreateTemplate/>}/>
            <Route path="/Validate" element={<Validate/> }/>
            <Route path="/Attach" element={<Attach/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/Analytics" element={<Analytics/>}/>
            <Route path="/AboutUs" element={<AboutUs/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="/ContactUs" element={  <ContactUs/> }/>
            <Route path="/SupportUs" element={  <SupportUs/> }/>
            <Route path="/ProofConcept" element={  <ProofConcept/> }/>
            <Route path="/News" element={  <News/> }/>
            <Route path="/FAQ" element={  <FAQ/> }/>

        </Routes>
        <Footer/>
            <SocialMediaLinksFooter/>
      </div>

  );
}

export default App;
