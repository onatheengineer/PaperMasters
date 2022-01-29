import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footers/Footer";
import Home from "./components/pages/Home";
import Analytics from "./components/pages/Analytics";
import Register from "./components/pages/Register";
import Validate from "./components/pages/Validate";
import Search from "./components/pages/Search";
import AboutUs from "./components/pages/AboutUs";
import Attach from "./components/pages/Attach";
import ContactUs from "./components/pages/ContactUs";
import News from "./components/pages/News";
import SupportUs from "./components/pages/SupportUs";
import Identity from "./components/pages/Identity";
import Learn from "./components/pages/Learn";
import CloudHWM from "./components/pages/CloudHWM";
import PageRoutes from './components/PageRoutes';
import {
  Routes,
  Route
} from "react-router-dom";
import {produce} from 'immer';
import Web3 from "web3";
import SocialMediaLinksFooter from "./components/molecules/Footers/SocialMediaLinksFooter";
import Sidebar, {NavItem} from "./components/molecules/Sidebar";
import {FaBookmark} from "react-icons/fa";
import {BiHomeHeart} from "react-icons/bi";
import CommunityForum from "./components/pages/CommunityForum";


function App() {

    // const Example = () => (
    //         <Planet size={200} mood="blissful" color="#FDA7DC" />
    //     )

  return (
        <div>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home/>}/>

            <Route path="/identity" element={<Identity/>}/>

            <Route path="/search" element={<Search/>}/>

            <Route path="/CloudHWM" element={<CloudHWM/>}/>

            <Route path="/communityforum" element={  <CommunityForum/> }/>

            <Route path="/learn" element={  <Learn/> }/>

            <Route path="/news" element={  <News/> }/>


            <Route path="/register" element={<Register/>}/>
            <Route path="/attach" element={<Attach/>}/>
            <Route path="/validate" element={<Validate/> }/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/aboutUs" element={<AboutUs/>}/>
            <Route path="/contactUs" element={  <ContactUs/> }/>
            <Route path="/supportUs" element={  <SupportUs/> }/>

        </Routes>
        <Footer/>
            <SocialMediaLinksFooter/>
      </div>

  );
}

export default App;
