import React, { useState } from 'react';
import './Login.css';
import gif_1 from '../../assets/images/gif1.gif';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface LoginProps {
  onNavigate: () => void;
}

function Login({ onNavigate }: LoginProps) {
  const [passwordFieldType, setPasswordFieldType] = useState<'password' | 'text'>('password');
  const toggleViewPassword = () =>{
    setPasswordFieldType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const showMessage = (newMessage: string, newSeverity: AlertColor = 'success') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);


  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Username:',username,'Password:',password);
    if(username==='chetan' && password==='luffy'){
      onNavigate();
    }
    else {
      showMessage("Incorrect username or password!!!!", "error")
    }
  };
  
  return (
      <div className="login-container">
        {/* <Nav items={test}></Nav> */}
        <div className="left-section">
          <h1>Welcome Back!</h1>
          <p>Log in to continue exploring amazing features.</p>
        </div>
        <div className="right-section">
          <div style={{alignContent:'center'}}>
            <img src={gif_1} alt="logo" width={200} height={200} />
          </div>
          <h2>Login</h2>
          <form>
            <label>Username</label>
            <div className="input-container">
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username" />
            </div>
          
            <label>Password</label><br></br>
            <div className="input-container">
              <input 
                type={passwordFieldType} 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" />
              <button type="button" id="toggle-password" onClick={toggleViewPassword}>
                {passwordFieldType ==='text' ? '🙈' : '👁️'}
              </button>
            </div>
            
            <div className="form-links">
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" onClick={handleLoginClick} className="login-button">Login</button>
          </form>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </div>
      
  );
}
export default Login;
