// Home.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import sendIcon from '../../assets/images/send.png' // Verify path matches your structure
import attachIcon from '../../assets/images/attach.png';
import './Home.css';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type Message = {
  message: string;
  timestamp: string;
  type: 'user' | 'response';
};

// Create a separate Message component for better animation control
const MessageDisplay = ({ msg }: { msg: Message }) => {
  const [displayedText, setDisplayedText] = useState('');

  const typeWriter = useCallback((text: string, i = 0) => {
    if (i < text.length) {
      setDisplayedText(text.slice(0, i + 1));
      setTimeout(() => typeWriter(text, i + 1), 40); // Adjust typing speed here
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

  // Sample initial data
  const userMessages = [
    { message: 'hello there', timestamp: '1' },
    { message: 'hello there2', timestamp: '3' }
  ];
  
  const responseMessages = [
    { message: 'howdy', timestamp: '2' },
    { message: 'mamma mia', timestamp: '4' }
  ];

  useEffect(() => {
    // Merge and sort messages
    const merged = [
      ...userMessages.map(m => ({ ...m, type: 'user' as const })),
      ...responseMessages.map(m => ({ ...m, type: 'response' as const }))
    ].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    
    setMessages(merged);
  }, []);

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
    setTimeout(() => {
      const newResponse: Message = {
        message: `Response to: ${input}`,
        timestamp: (Date.now() + 1).toString(),
        type: 'response'
      };
      setMessages(prev => [...prev, newResponse]);
    }, 1000);

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
