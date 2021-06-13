import React from 'react';
import './index.css'
import { AnswerObject } from '../../views/quiz'
import { useState } from 'react';
import { useEffect } from 'react';

type Props = {
    question: String;
    choices: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    questionNr: number;
    totalQuestions: number;
    answers: AnswerObject[]
};

const QuestionCard: React.FC<Props> = ({
    question,
    choices,
    callback,
    questionNr,
    totalQuestions,
    answers
}) => {
    const [clicked, setClicked] = useState(false)
    const choiceKeyQuiz = () => {
        const keyList = [];
        for (const key in choices) {
            keyList.push(key)
        }
        return keyList
    }
    useEffect(() => {
        setClicked(false)
    }, [clicked])

    const choiceValueQuiz = () => {
        const valueList = []
        for (const key in choices) {
            valueList.push(choices[key])
        }
        return valueList
    }

    const handleOnClick = (e: any) => {
        setClicked(true)
        callback(e)
    }

    const choiceKeyList: string[] = choiceKeyQuiz();
    const choiceValueList: string[] = choiceValueQuiz();

    return (
        <>
            <p className='number'>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p >{question}</p>
            <ul>
                {
                    choiceKeyList.map((choice, index) => (
                        <li key={choice}>
                            <button className={answers.find(answer => answer.id === questionNr && answer.choice === choice) ?
                                'choice btn clicked' :
                                'choice btn'}
                                onClick={handleOnClick}
                                value={choice}>
                                <span >{choiceValueList[index]}</span>
                            </button>
                        </li>))
                }
            </ul>
        </>
    )
};

export default QuestionCard;