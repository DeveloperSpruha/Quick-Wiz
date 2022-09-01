import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Results.css'
import { UserAuth } from '../../context/contextAuth'
import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const Results = () => {
  const category = useSelector((state) => state.category.value)
  const score = useSelector((state) => state.score.value)
  const { user } = UserAuth()
  const resultsRef = collection(db, "Results")

  const categoriesData = {
    'arts_and_literature': 'Arts & Literature',
    'film_and_tv': 'Film & TV',
    'food_and_drink': 'Food & Drinks',
    'general_knowledge': 'General Knowledge',
    'geography': 'Geography',
    'history': 'History',
    'music': 'Music',
    'science': 'Science',
    'sport_and_leisure': 'Sports & Leisure',
    'trivia_hell': 'Trivia Hell',
  }

  useEffect(() => {
    const displayName = user.displayName
    const userEmail = user.email
    const sendScores = async () => {
      if (displayName == null) {
        await addDoc(resultsRef, { username: userEmail, score: score, category: categoriesData[category] })
      } else {
        await addDoc(resultsRef, { username: displayName, score: score, category: categoriesData[category] })
      }
    }
    sendScores()
  }, [])

  return (
    <div className="ResultsPage">
      <h1 className="title">Results</h1>
      <div className="scoreDisplay">
        <p className="pTags">Category:</p>
        <p className="pTags">{categoriesData[category]}</p>
        <div className="score">
          <h1>{score}</h1>
          <hr></hr>
          <h1>200</h1>
        </div>
        <div className="linksDiv">
          <p><Link className="leaderboardLink" to='/start/'>Take Quiz Again</Link></p>
          <br />
          <p><Link className="leaderboardLink" to='/leaderboard/'>Go to leaderboard</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Results