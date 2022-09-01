import React, { useState, useEffect, useRef, startTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuestions } from '../../features/questions';
import Axios from 'axios';
import { CircularProgress } from '@mui/material';
import QuestionComponent from '../QuestionComponent/QuestionComponent';
import Countdown from 'react-countdown';
import './Quiz.css'
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const category = useSelector((state) => state.category.value)
    const currentIndex = useSelector((state) => state.currentIndex.value)
    const [loading, setLoading] = useState(true)
    const datetime = useRef(Date.now() + 5 * (1000 * 60))

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

    const renderer = ({ minutes, seconds, completed, date }) => {
        if (!loading){
            
        }
        if (completed) {
            // Render a completed state
            navigate('/results/')
        } else {
            return <div className="timerDiv"><span className="timer">{minutes}:{seconds}</span></div>;
        }
    };

    const fetchQuestions = async (APIURL) => {
        const response = await Axios.get(APIURL).then((res) => {
            dispatch(updateQuestions(res.data))
            setLoading(false)
        })
    }

    useEffect(() => {
        if (category == 'trivia_hell'){
            const APIURL = 'https://the-trivia-api.com/api/questions?limit=50'
            fetchQuestions(APIURL)
        } else {
            const APIURL = 'https://the-trivia-api.com/api/questions?' + 'categories=' + category + '&limit=50'
            fetchQuestions(APIURL)
        }
    }, [])

  return (
    <div className="QuizPage">
          {loading ? 
          <CircularProgress className="loading" size={80} /> : 
          <>
          <QuestionComponent category={categoriesData[category]} />
          <Countdown date={datetime.current} renderer={renderer} autoStart={true} />
          </>}
    </div>
  )
}

export default Quiz