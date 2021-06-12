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
    id: number;
    answer: String;
};

type listAnswerObject = {
    listAnswer: AnswerObject[]
}

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<listAnswerObject>({ listAnswer: [] });
    const [gameOver, setGameOver] = useState(false);
    const [submit, setSubmit] = useState(false);
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
                id: questions[number].id,
                answer,
            };
            const prevAnswers: listAnswerObject = answers;
            if (prevAnswers.listAnswer.find(answer => answer.id === answerObject.id)) {
                prevAnswers.listAnswer.forEach(prev => {
                    if (prev.id === answerObject.id) {
                        prev.answer = answerObject.answer
                    }
                })
            }
            else {
                prevAnswers.listAnswer.push(answerObject)
            }
            setAnswers(prevAnswers);
            console.log(answers);
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

    useEffect(() => {
        async function postAnswer() {
            await axios.post('https://react14-contest-easy-quiz-app.herokuapp.com/quiz/answer', answers)
                .then((response: AxiosResponse) => {
                    console.log(response.data.result);
                });
        }
        postAnswer()
    }, [submit])

    const submitAnswers = () => {
        setSubmit(true)
    }

    return (
        <>
            <h1>REACT QUIZ</h1>
            {loading ? <p>Loading Questions...</p> : null}
            {!loading ? (
                <>
                    <QuestionCard
                        questionNr={number + 1}
                        totalQuestions={totalQuestion}
                        question={questions[number].question}
                        choices={questions[number].choices}
                        callback={checkAnswer}
                    />
                    <button className='submit' onClick={submitAnswers}>Submit</button>
                </>
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
