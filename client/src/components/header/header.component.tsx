import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from "*.svg";
import './header.styles.scss'

const Header = () => (
    <div className='header'>
        <Link className= 'logo-container' to= "/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/identities'> Identities</Link>
            <Link className='option' to='/getminted'> GetMinted</Link>
        </div>
    </div>
);


