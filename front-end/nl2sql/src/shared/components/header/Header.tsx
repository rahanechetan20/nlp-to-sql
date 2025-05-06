import React from 'react';
import './Header.css';
import logo2 from '../../../assets/images/logo2.png';

function Header() {
    return (
        <div className='header'>
            <div style={{width:'0%', marginLeft:'10px'}}> 
                <img src={logo2} alt="logo" width={55} height={55}/>
            </div>
            <div style={{width:'100%', color:'white', textAlign:'center'}}>
                <h3>NL-2-SQL</h3>
            </div>
        </div>
    );
}

export default Header;
