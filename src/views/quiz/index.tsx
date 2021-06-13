import React from 'react'
import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

import QuestionCard from '../../components/questionCard'
import { useHistory } from 'react-router-dom';
import './index.css'

interface QuizQuestion {
    id: number,
    question: String,
    choices: any
}

export type AnswerObject = {
    id: number;
    choice: String;
};

type listAnswerObject = {
    listAnswer: AnswerObject[]
}

export const RESULT = {
    totalQuestion: 0,
    incorrectAnswers: [],
    submited: false
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<listAnswerObject>({ listAnswer: [] });
    const [submit, setSubmit] = useState(false);
    RESULT.totalQuestion = questions.length

    useEffect(() => {
        async function getQuestions() {
            setLoading(true);
            await axios.get('https://react14-contest-easy-quiz-app.herokuapp.com/quiz')
                .then((response: AxiosResponse) => {
                    console.log(response.data.result);
                    setQuestions(response.data.result)
                });
            setLoading(false);
        }
        getQuestions();
    }, [])

    const checkAnswer = (e: any) => {
        // User's answer
        const choice = e.currentTarget.value;
        // Save the answer in the array for user answers
        const answerObject = {
            id: questions[number].id,
            choice,
        };
        const prevAnswers: listAnswerObject = answers;
        if (prevAnswers.listAnswer.find(answer => answer.id === answerObject.id)) {
            prevAnswers.listAnswer.forEach(prev => {
                if (prev.id === answerObject.id) {
                    prev.choice = answerObject.choice
                }
            })
        }
        else {
            prevAnswers.listAnswer.push(answerObject)
        }
        setAnswers(prevAnswers);
    };

    const nextQuestion = () => {
        // Move on to the next question if not the last question
        const nextQ = number + 1;
        setNumber(nextQ);
    };

    const prevQuestion = () => {
        // Move on to the next question if not the last question
        const nextQ = number - 1;
        setNumber(nextQ);
    };

    useEffect(() => {
        async function postAnswer() {
            await axios.post('https://react14-contest-easy-quiz-app.herokuapp.com/quiz/answer', answers)
                .then((response: AxiosResponse) => {
                    console.log(answers);
                    RESULT.incorrectAnswers = response.data.incorrectAnswers
                });
        }
        postAnswer()
    }, [submit])

    const submitAnswers = () => {
        RESULT.submited = true
        setSubmit(true)
    }

    const history = useHistory()
    const navResult = () => { history.replace('/view-result') }

    const tryAgain = () => {
        setNumber(0)
        setSubmit(false)
        RESULT.incorrectAnswers = []
        RESULT.submited = false
        setAnswers({ listAnswer: [] })
    };

    return (
        <>
            <h1>REACT QUIZ</h1>
            <div className='content'>
                {loading ? <p>Loading Questions...</p> : null}
                {!loading && !submit ? (
                    <>
                        <QuestionCard
                            questionNr={number + 1}
                            totalQuestions={RESULT.totalQuestion}
                            question={questions[number].question}
                            choices={questions[number].choices}
                            callback={checkAnswer}
                        />
                    </>
                ) : !loading && submit ?
                    <div>
                        <h3>You have finished the challenge!!!</h3>
                        <button className='btn' onClick={navResult}>View your result</button>
                        <button className='btn' onClick={tryAgain}>Try again</button>
                    </div> : null}
                {!loading && !submit && number !== 0 ? (
                    <button className='btn next' onClick={prevQuestion}>
                        Prev Question
                    </button>
                ) : null}
                {!loading && !submit && number !== RESULT.totalQuestion - 1 ? (
                    <button className='btn next' onClick={nextQuestion}>
                        Next Question
                    </button>
                ) : null}
                {!loading && !submit ? <button className='btn submit' onClick={submitAnswers}>Submit</button> : null}
            </div>
        </>
    )
}

export default Quiz
