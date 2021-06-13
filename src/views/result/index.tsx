import React from 'react'
import { useHistory } from 'react-router-dom'
import { RESULT } from '../quiz'

const ViewResult = () => {
    const history = useHistory()
    const navQuiz = () => { history.replace('/quiz') }
    return (
        <>
            <h1>Your Result</h1>
            <div className='content'>
                {RESULT.submited ?
                    <>
                        <h3>{RESULT.incorrectAnswers.length}/{RESULT.totalQuestion}</h3>
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
