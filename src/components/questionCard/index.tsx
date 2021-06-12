import React from 'react';
// Types
import { AnswerObject } from '../../views/quiz';

type Props = {
    question: String;
    choices: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    question,
    choices,
    callback,
    questionNr,
    totalQuestions,
}) => {
    // const choiceKeyQuiz = () => {
    //     const keyList = [];
    //     for (const key in choices) {
    //         keyList.push(choices[key])
    //     }
    //     return keyList
    // }

    const choiceValueQuiz = () => {
        const valueList = []
        for (const key in choices) {
            valueList.push(choices[key])
        }
        return valueList
    }

    // const choiceKeyList: string[] = choiceKeyQuiz();
    const choiceValueList: string[] = choiceValueQuiz();

    return (
        <>
            <p className='number'>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p >{question}</p>
            <ul>
                {
                    choiceValueList.map((choice) => (
                        <li key={choice}>
                            <button onClick={callback} value={choice}>
                                <span >{choice}</span>
                            </button>
                        </li>))
                }
            </ul>
        </>
    )
};

export default QuestionCard;