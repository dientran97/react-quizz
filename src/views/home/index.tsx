import React from 'react'
import { useHistory } from 'react-router-dom'

import './index.css'

const Home = () => {
    const history = useHistory()
    const navLogin = () => { history.replace('/login') }
    const navQuiz = () => { history.replace('/quiz') }

    return (
        <>
            <h1>Welcome To React Quiz</h1>
            <div className='content'>
                {localStorage.getItem('accessToken') ?
                    <div>
                        <h3>Are you ready for challenge?</h3>
                        <button className='btn' onClick={navQuiz}>Start Quiz</button>
                    </div> :
                    <div>
                        <h3>Please login to start Quiz!!!</h3>
                        <button className='btn' onClick={navLogin}>Go To Login</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Home
