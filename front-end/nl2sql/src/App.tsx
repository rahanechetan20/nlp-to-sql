import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './shared/components/header/Header';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </Router>

    </div>
  );
}

export default App;
