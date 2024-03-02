import React from 'react';
import { Routes, Route } from "react-router-dom";
import Auth from './components/auth/Auth';
import Connect from './components/auth/connectWallet';
import Main from './components/Main';
import Profile from './components/profile/Profile';
import Review from './components/Review';
import ReviewPage from './components/reviewPage';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/auth" element={<Auth />} />
      <Route path='/review' element={<Review />} />
      <Route path='/search/:text' element={<Search />} />
      <Route path='/reviews/:addr' element={<ReviewPage />} />
      <Route path='/connectWallet' element={<Connect />} />
    </Routes>
  );

}

export default App;