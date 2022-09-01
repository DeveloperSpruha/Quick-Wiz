import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { UserAuth } from '../../context/contextAuth'

const Home = () => {
  const {user} = UserAuth()
  const navigate = useNavigate()
  
  const redirectToLogin = () => {
    if (user!=null){
      navigate('/start/')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="HomePage">
      <div className="HomeTitle">
        <h1>Quick Wiz</h1>
      </div>
      <div className="tagline">
        <p>A really really fast paced quiz.</p>
      </div>
      <div className="redirect">
        <button onClick={redirectToLogin}>Get Started</button>
      </div>
      <div className="showcase">
        <div className="speed item">
          <h2 className="itemTitle">Speed</h2>
          <p>Answer 50 questions in under 5 minutes</p>
        </div>
        <div className="categories item">
          <h2 className="itemTitle">Categories</h2>
          <p>Pick from a wide variety of topics.</p>
        </div>
        <div className="compare item">
          <h2 className="itemTitle">Compare</h2>
          <p>See how you rank with your friends and others around the world.</p>
        </div>
      </div>
    </div>
  )
}

export default Home