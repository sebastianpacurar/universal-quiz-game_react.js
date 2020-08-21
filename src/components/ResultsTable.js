import React from 'react';


const ResultsTable = props => {
    const {questions} = props;

    return (
        <table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
            </tr>
            </thead>
            <tbody>
            {questions.map((question, index) => (
                <tr key={`${question}-${index}`}>
                    <td dangerouslySetInnerHTML={{__html: question.question}}/>
                    <td dangerouslySetInnerHTML={{__html: question.correct_answer}}/>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ResultsTable;