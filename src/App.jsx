import React from 'react';
import Header from './components/Header';
import YoutubePage from './pages/YoutubePage';
import MotivationalQuotes from './pages/MotivationalQuotes';
import Dashboard from './pages/Dashboard/Dashboard';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import PomodoroTimer from './components/pomodoro/PomodoroTimer';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Dashboard />
              <YoutubePage />
              <MotivationalQuotes />
              
            </>
          }
        />

        <Route
          path="/pomodoro"
          element={
            <PomodoroTimer />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
