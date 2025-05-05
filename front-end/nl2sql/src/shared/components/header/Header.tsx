import React from 'react';
import './Header.css';
import logo from '../../../assets/images/logo.png';

function Header() {
    return (
        <div className='header'>
            <div style={{width:'0%'}}> 
                <img src={logo} alt="logo" width={70} height={55}/>
            </div>
            <div style={{width:'100%', color:'white', textAlign:'center'}}>
                <h3>NL-2-SQL</h3>
            </div>
        </div>
    );
}

export default Header;
