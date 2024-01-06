import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import Login from './components/LoginFormPage';
import SignUp from './components/SignUpFormPage';
import './App.css';
import UserProfile from './components/UserProfile';
import FeedSection from './components/FeedSection';
import Reviews from './components/Reviews';
import Photos from './components/Photos';
import Activities from './components/Activities';
import Completed from './components/Completed';
import List from './components/List';
import Community from './components/Community';


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
          <Route path="/community" element={<Community />} />
          {/* Use nested routes for the different sections under the UserProfile details section */}
          <Route path="/members/:userName/*" element={<UserProfile />}>
            <Route path="feed" element={<FeedSection />} />
            <Route path="photos" element={<Photos />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="activities" element={<Activities />} />
            <Route path="completed" element={<Completed />} />
            <Route path="list" element={<List />} />
          </Route>


        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>

    </div>
  );
}

export default App;
