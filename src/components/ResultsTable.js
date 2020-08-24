import React from 'react';
import PropTypes from 'prop-types';

// import DOMPurify to sanitize the dangerouslySetInnerHTML
import DOMPurify from 'dompurify';


const ResultsTable = props => {
    const {questions} = props;

    // get rid of the status property to render table
    delete questions.status;

    return (
        <table>
            <thead>
            <tr>
                <th>Question</th>
                <th>Answer</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(questions).map((question, index) => (
                <tr key={`${question}-${index}`}>
                    <td dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.question)}}/>
                    <td dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.correct_answer)}}/>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


// prop types
ResultsTable.propTypes = {
    questions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
}


export default ResultsTable;