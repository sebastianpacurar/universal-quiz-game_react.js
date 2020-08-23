import React from 'react';

// import DOMPurify to sanitize the dangerouslySetInnerHTML
import DOMPurify from 'dompurify';


const QuestionSection = props => {

    const {questions, questionNo, handleNextQuestion, handleCheckAnswer, isBtnDisabled, score} = props;
    const currentQuestion = questions[questionNo];

    return (
        <article id='quiz-section'>

            <h3>Question {questionNo + 1} out of {Object.keys(questions).length -1}</h3>
            <h3>Score: {score}</h3>

            {/* using dangerouslySetInnerHTML to be able to parse the symbols.
                  to prevent the issue with XSS in a real life project, I used DOMPurify.sanitize()
            */}
            <h3 id='question-category'>{currentQuestion.category}</h3>
            <section id='question' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(currentQuestion.question)}}/>

            <article id='answers-container'>
                {currentQuestion.allAnswers.map((answer, index) => (
                    <section
                        className='possible-answers'
                        key={`${answer}-${index}`}
                        onClick={handleCheckAnswer}
                        data-unparsed={answer}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(answer)}}/>
                ))}
            </article>

            <button
                className='btn first-btn'
                onClick={handleNextQuestion}
                disabled={isBtnDisabled}
            >
                {questionNo + 1 === Object.keys(questions).length -1 ? 'Check Result' : 'Next Question'}
            </button>

        </article>
    );
};

export default QuestionSection;