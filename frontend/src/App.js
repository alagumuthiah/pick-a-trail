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
import Explore from './components/Explore';
import TrailInfo from './components/TrailInfo';
import ProtectedRoute from './utils/ProtectedRoute';
import ListDetails from './components/ListDetails';
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
          <Route path="/explore" element={<Explore />} />
          <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>} />
          <Route path="/members/:userName" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }>
            <Route path="feed" element={
              <ProtectedRoute>
                <FeedSection />
              </ProtectedRoute>} />
            <Route path="photos" element={
              <ProtectedRoute>
                <Photos />
              </ProtectedRoute>} />
            <Route path="reviews" element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>} />
            <Route path="activities" element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>} />
            <Route path="completed" element={
              <ProtectedRoute>
                <Completed />
              </ProtectedRoute>} />
            <Route path="list" element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>} />
          </Route>
          <Route path="/lists/:listName" element={
            <ProtectedRoute>
              <ListDetails />
            </ProtectedRoute>}>
          </Route>
          <Route path="/trails/:trailName/*" element={
            <ProtectedRoute>
              <TrailInfo />
            </ProtectedRoute>}>
          </Route>


        </Routes>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>

    </div >
  );
}

export default App;
