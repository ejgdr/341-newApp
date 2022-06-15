import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import TrackingsPage from './pages/Trackings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage/>} exact/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/events" element={<EventsPage/>}/>
          <Route path="/trackings" element={<TrackingsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
