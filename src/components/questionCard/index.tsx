import React from 'react';

type Props = {
    question: String;
    choices: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    const choiceKeyQuiz = () => {
        const keyList = [];
        for (const key in choices) {
            keyList.push(key)
        }
        return keyList
    }

    const choiceValueQuiz = () => {
        const valueList = []
        for (const key in choices) {
            valueList.push(choices[key])
        }
        return valueList
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
                            <button onClick={callback} value={choice}>
                                <span >{choiceValueList[index]}</span>
                            </button>
                        </li>))
                }
            </ul>
        </>
    )
};

export default QuestionCard;