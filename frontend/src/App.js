import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import TrackingsPage from './pages/Trackings';
import MainNavigation from './components/Navigation/MainNavigation';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation/>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AuthPage/>} exact/>
              <Route path="/auth" element={<AuthPage/>}/>
              <Route path="/events" element={<EventsPage/>}/>
              <Route path="/trackings" element={<TrackingsPage/>}/>
          </Routes>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
