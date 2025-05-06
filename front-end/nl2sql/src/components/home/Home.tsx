// Home.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import sendIcon from '../../assets/images/send.png';
import attachIcon from '../../assets/images/attach.png';
import './Home.css';
import { Snackbar, Alert, AlertColor } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { queryRequest } from '../../shared/slices/query.slice';
import { RootState } from '../../shared/store/store';

type Message = {
  message: string;
  timestamp: string;
  type: 'user' | 'response';
};

const MessageDisplay = ({ msg }: { msg: Message }) => {
  const [displayedText, setDisplayedText] = useState('');

  const typeWriter = useCallback((text: string, i = 0) => {
    if (i < text.length) {
      setDisplayedText(text.slice(0, i + 1));
      setTimeout(() => typeWriter(text, i + 1), 40);
    }
  }, []);

  useEffect(() => {
    if (msg.type === 'response') {
      typeWriter(msg.message);
    } else {
      setDisplayedText(msg.message);
    }
  }, [msg.message, msg.type, typeWriter]);

  return (
    <div className={`message ${msg.type}`}>
      {displayedText}
      {msg.type === 'response' && displayedText.length < msg.message.length && (
        <span className="cursor">|</span>
      )}
    </div>
  );
};

function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMessages(prev => 
      [...prev].sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
    );
  }, [messages.length]); 

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      message: input,
      timestamp: Date.now().toString(),
      type: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate API response
    // setTimeout(() => {
    //   const newResponse: Message = {
    //     message: `Response to: ${input}`,
    //     timestamp: (Date.now() + 1).toString(),
    //     type: 'response'
    //   };
    //   setMessages(prev => [...prev, newResponse]);
    // }, 1000);
    handleSubmit(input);

    setInput('');
  };


  // snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const showMessage = (newMessage: string, newSeverity: AlertColor = 'success') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const attachClicked = () => {
    showMessage('Functionality not available!! Stay tuned...', 'info');
  }

  //API call
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state: RootState) => state.query);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (inputText: string) => {
    dispatch(queryRequest({ query: inputText }));
  };
  useEffect(() => {
    if (data) {
      const newResponseMessage: Message = {
        message: data.message,
        timestamp: data.timestamp,
        type: 'response'
      };
      
      setMessages(prev => [...prev, newResponseMessage]);
    }
  }, [data]);

  return (
    <div className="elevated-container">
      <div className="elevated-box scrollable-hidden">
        <div className="chat-container scrollable-hidden">
          {messages.map((msg, index) => (
            <MessageDisplay key={index} msg={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
          />
          <div className="button-wrapper">
            <button className="icon-button-1" onClick={attachClicked}>
              <img src={attachIcon} alt="Attach file" className="icon-image" />
            </button>
            <button className="icon-button" onClick={handleSend}>
              <img src={sendIcon} alt="Send message" className="icon-image" />
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={1500}
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

export default Home;
