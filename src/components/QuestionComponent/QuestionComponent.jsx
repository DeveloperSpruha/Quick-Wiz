import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateIndex } from '../../features/currentIndex';
import arrayShuffle from 'array-shuffle';
import './QuestionComponent.css';
import { updateScore } from '../../features/score';

const QuestionComponent = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentQuestion, setCurrentQuestion] = useState([])
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const questions = useSelector((state) => state.questions.value)
  const currentIndex = useSelector((state) => state.currentIndex.value)
  const score = useSelector((state) => state.score.value)

  const getQuestion = () => {
    setCurrentQuestion(questions[currentIndex])
    setCorrectAnswer(questions[currentIndex].correctAnswer)
    let choicesArray = []
    choicesArray.push(questions[currentIndex].correctAnswer)
    questions[currentIndex].incorrectAnswers.map(option => {
      choicesArray.push(option)
    })
    choicesArray = arrayShuffle(choicesArray)
    setOptions(choicesArray)
  }

  const handleIndex = (e) => {
    let choice = e.target.value
    if (choice == correctAnswer){
      dispatch(updateScore(score + 4))
    } else {
      dispatch(updateScore(score - 1))
    }
    if (currentIndex != 49){
      dispatch(updateIndex(currentIndex + 1))
    } else {
      dispatch(updateIndex(0))
      navigate('/results/')
    }
  }

  const handleSkip = () => {
    if (currentIndex != 49){
      dispatch(updateIndex(currentIndex + 1))
    } else {
      dispatch(updateIndex(0))
      navigate('/results/')
    }
  }

  useEffect(() => {
    dispatch(updateIndex(0))
    dispatch(updateScore(0))
  }, [])

  useEffect(() => {
    getQuestion()
  }, [currentIndex])

  return (
    <>
      <div className="quizContainer">
          <div className="questionNumber">
            <p>{currentIndex + 1}</p>
          </div>
          <div className="question">
            <p>{currentQuestion.question}</p>
          </div>
          <div className="options">
            {options.map(ans => {
              return <button className="option" key={ans} value={ans} onClick={e => handleIndex(e)}>{ans}</button>
            })}
          </div>
          <div><button className="option skip" onClick={handleSkip}>SKIP</button></div>
      </div>
    </>
  )
}

export default QuestionComponent