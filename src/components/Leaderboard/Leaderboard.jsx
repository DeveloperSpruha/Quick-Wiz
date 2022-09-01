import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Leaderboard.css';
import { db } from '../../firebaseConfig'
import { collection, getDocs, where, query, orderBy, limit, documentId } from 'firebase/firestore'
import HomeIcon from '@mui/icons-material/Home';

const Leaderboard = () => {
  const [category, setCategory] = useState('Trivia Hell')
  const [leaders, setLeaders] = useState([])
  const scoresRef = collection(db, 'Results')

  const handleChange = (e) => {
    let selected = e.target.value
    setCategory(selected)
  }

  const getLeaderboard = async () => {
    const q = query(collection(db, 'Results'), where("category", "==", category), orderBy('score', 'desc'), orderBy('username', 'asc'), limit(50));
    const querySnapshot = await getDocs(q)
    setLeaders(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(() => {
    getLeaderboard()
  }, [category])

  return (
    <div className="leaderboardPage">
      <div className="leaderboardTitle">Leaderboard</div>
      <div className="categories">
        <div className="selectDiv">
          <select defaultValue="Trivia Hell" onChange={e => handleChange(e)}>
            <option value="Arts & Literature">Arts & Literature</option>
            <option value="Film & TV">Film & TV</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="General Knowledge">General Knowledge</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="Music">Music</option>
            <option value="Science">Science</option>
            <option value="Sports & Leisure">Sports & Leisure</option>
            <option value="Trivia Hell">Trivia Hell</option>
          </select>
        </div>
      </div>
      <div className="tableContainer">
        <table className="table">
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
            {leaders.map((leader, i) => {
              return (
                <tr key={leader.id}>
                  <td>{i + 1}</td>
                  <td>{leader.username}</td>
                  <td>{leader.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="HomeLogo">
        <Link style={{ color: "white" }} to="/start/">Go Back <HomeIcon style={{position:'relative', top:'5px'}} /></Link>
      </div>
    </div>
  )
}

export default Leaderboard