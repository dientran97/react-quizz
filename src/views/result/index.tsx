import React from 'react'
import { useHistory } from 'react-router-dom'
import { RESULT } from '../quiz'

const ViewResult = () => {
    const history = useHistory()
    const navQuiz = () => { history.replace('/quiz') }
    const tryAgain = () => {
        history.replace('/quiz')
        RESULT.incorrectAnswers = []
        RESULT.submited = false
    }
    return (
        <>
            <div className='content'>
                {RESULT.submited ?
                    <>
                        <h1>Your Result</h1>
                        <h2>{RESULT.totalQuestion - RESULT.incorrectAnswers.length}/{RESULT.totalQuestion}</h2>
                        <button className='btn' onClick={tryAgain}>Try again</button>
                    </>
                    :
                    <div>
                        <h3>Please start Quiz!!!</h3>
                        <button className='btn' onClick={navQuiz}>Start Quiz</button>
                    </div>
                }
            </div>
        </>
    )
}

export default ViewResult
