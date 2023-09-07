import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import Login from './components/LoginFormPage';
import SignUp from './components/SignUpFormPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavigationBar />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>

    </div>
  );
}

export default App;
