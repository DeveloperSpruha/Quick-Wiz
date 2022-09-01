import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/contextAuth';
import { changeCategory } from '../../features/category';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from 'react-router-dom';
import './Start.css'

const Start = () => {
  const dispatch = useDispatch()
  const { logout, user } = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      // console.log(error)
    }
  }

  const handleCategory = (e) => {
    let currentCategory = e.target.value
    dispatch(changeCategory(currentCategory))
  }

  const handleQuizStart = () => {
    navigate('/quiz/')
  }

  useEffect(() => {
    if (user == null) {
      navigate("/login/")
    }
  }, [user])

  return (
    <div className='StartPage'>
      <h1 className="Title">Quick Wiz</h1>
      <div className='Rules'>
        <h2 className='RulesTitle'>Rules</h2>
        <ol>
          <li>You can look through any resource you wish for the right answer. The cost is time.</li>
          <li>You have 5 minutes to answer 50 questions.</li>
          <li>You are awarded 4 points for a right answer.</li>
          <li>There is a penalty of -1 points for an incorrect answer.</li>
          <li>If you do not know an answer, you can skip the question. No penalty will be incurred on skipping a question.</li>
          <li>Your final score will be stored in relation with the category selected.</li>
        </ol>
      </div>
      <h2 className="categoryTitle">Select a category</h2>
      <div className="selectDiv">
        <select onChange={e => handleCategory(e)} defaultValue="trivia_hell">
          <option value="arts_and_literature">Arts & Literature</option>
          <option value="film_and_tv">Film & TV</option>
          <option value="food_and_drink">Food & Drinks</option>
          <option value="general_knowledge">General Knowledge</option>
          <option value="geography">Geography</option>
          <option value="history">History</option>
          <option value="music">Music</option>
          <option value="science">Science</option>
          <option value="sport_and_leisure">Sports & Leisure</option>
          <option value="trivia_hell">Trivia Hell</option>
        </select>
      </div>
      <br />
      <div className="startQuizDiv">
        <button className="startQuizBtn" onClick={handleQuizStart}>Start QuickWiz</button>
      </div>
      <div className="leaderboardDiv">
        <Link to="/leaderboard/"><button className="leaderboardBtn">Leaderboard<LeaderboardIcon style={{ position: 'relative', left: '5px', top: '2px', color: 'inherit', backgroundColor: 'inherit' }} /></button></Link>
      </div>
      <div className="logoutDiv">
        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Start