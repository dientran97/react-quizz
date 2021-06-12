import React from 'react'
import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

import QuestionCard from '../../components/questionCard'

interface QuizQuestion {
    id: number,
    question: String,
    choices: any
}

export type AnswerObject = {
    question: String;
    answer: String;
};

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const totalQuestion = questions.length

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
        if (!gameOver) {
            // User's answer
            const answer = e.currentTarget.value;
            // Save the answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    const nextQuestion = () => {
        // Move on to the next question if not the last question
        const nextQ = number + 1;
        if (nextQ === totalQuestion) {
            setGameOver(true);
        } else {
            setNumber(nextQ);
        }
    };

    return (
        <>
            <h1>REACT QUIZ</h1>
            {loading ? <p>Loading Questions...</p> : null}
            {!loading ? (
                <QuestionCard
                    questionNr={number + 1}
                    totalQuestions={totalQuestion}
                    question={questions[number].question}
                    choices={questions[number].choices}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                />
            ) : null}
            {!loading && !gameOver && number !== totalQuestion - 1 ? (
                <button className='next' onClick={nextQuestion}>
                    Next Question
                </button>
            ) : null}
        </>
    )
}

export default Quiz
