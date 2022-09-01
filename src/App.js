import './App.css';
import { UserAuth } from './context/contextAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Start from './components/Start/Start';
import Quiz from './components/Quiz/Quiz';
import Results from './components/Results/Results';
import Leaderboard from './components/Leaderboard/Leaderboard';

function App() {
  const user = UserAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/start/" element={<Start />} />
        <Route path="/quiz/" element={<Quiz />} />
        <Route path="/results/" element={<Results />} />
        <Route path="/leaderboard/" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
