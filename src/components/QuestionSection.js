import React from 'react';


const QuestionSection = props => {

    const {questions, questionNo, handleNextQuestion, handleCheckAnswer, isBtnDisabled, score} = props;
    const currentQuestion = questions[questionNo];

    return (
        <article id='quiz-section'>

            <h3>Question {questionNo + 1} out of {questions.length}</h3>
            <h3>Score: {score}</h3>

            {/* using dangerouslySetInnerHTML to be able to parse the symbols. it's like using innerHTML in vanilla JS
                  NEVER USE THIS TYPE OF ATTRIBUTE IN REACT, because it is an opening to an XSS (cross-site scripting) attack,
                  but to be able to have a workaround on SoloLearn, i chose this way.
            */}
            <h3 id='question-category'>{currentQuestion.category}</h3>
            <section id='question' dangerouslySetInnerHTML={{__html: currentQuestion.question}}/>

            <article id='answers-container'>
                {currentQuestion.allAnswers.map((answer, index) => (
                    <section
                        className='possible-answers'
                        key={`${answer}-${index}`}
                        onClick={handleCheckAnswer}
                        data-unparsed={answer}
                        dangerouslySetInnerHTML={{__html: answer}}/>
                ))}
            </article>

            <button
                className='btn first-btn'
                onClick={handleNextQuestion}
                disabled={isBtnDisabled}
            >
                {questionNo + 1 === questions.length ? 'Check Result' : 'Next Question'}
            </button>

        </article>
    )
}

export default QuestionSection;