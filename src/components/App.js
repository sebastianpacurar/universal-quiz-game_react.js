import React, {useState, useEffect} from 'react';

// utils related
import {CHALLENGE_CATEGORY, TYPE, DIFFICULTY} from '../utils/selectOptions';

// fetch method
import {fetchQuestions} from '../API';

const App = () => {
    const [gameSelect, setGameSelect] = useState({
        category: "",
        difficulty: "",
        type: "",
        questionsAmount: "",
    });
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);


    const handleStatus = (e) => {
        const key = e.target.id.split('-')[0];
        const value = e.target.value;

        setGameSelect({
            ...gameSelect, [key]: value
        })
    }

    const startGame = async () => {
        setGameStarted(true);
        setLoading(true);
        const questions = await (fetchQuestions(
            gameSelect.questionsAmount,
            gameSelect.category,
            gameSelect.difficulty,
            gameSelect.type
        ));

        setQuestions(questions);
        setLoading(false);
    }

    const nextQuestion = () => {
        setQuestionNo(questionNo + 1);
        setNextBtnDisabled(!nextBtnDisabled);
    }

    // when questionsNumber reaches the questionAmount the user selected, end the game
    useEffect(() => {
        if (questionNo === parseInt(gameSelect.questionsAmount)) {
            setGameStarted(false);
            setQuestionNo(0);
            setScore(0);
        }
    }, [questionNo])

    /*
        I used event bubbling here to be able to mark the right answer green and the user selected answer
          red. In case the user selects the right answer, then only the right answer will be marked;
          Also increment score by one

        The reason for using the data-unparsed custom attribute in the option tag,
         is because the text symbols are encoded and will return false positive answers sometimes
    */
    const checkAnswer = (e) => {
        const value = e.target.attributes.getNamedItem('data-unparsed').value;
        const answers = e.target.parentNode.children;

        // in case the answer has been already selected, do nothing
        for (let event of answers) {
            if (event.style.backgroundColor === 'red' || event.style.backgroundColor === 'green') {
                return;
            }
        }

        e.target.style.border = '1px solid #8a2be2';

        if (value === questions[questionNo].correct_answer) {
            e.target.style.backgroundColor = 'green';
            e.target.style.color = 'white';
            setScore(score + 1);
        } else {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'white';

            for (let event of answers) {
                if (event.attributes.getNamedItem('data-unparsed').value === questions[questionNo].correct_answer) {
                    event.style.backgroundColor = 'green';
                    event.style.color = 'white';
                }
            }
        }
        setNextBtnDisabled(!nextBtnDisabled);
    }

    return (
        <React.Fragment>

            <h1>Universal Quiz Game</h1>

            {/* if loading state is true display loading spinner*/}
            {loading && (
                <article>
                    <section className='spinner'>
                        <span className='spinner-inner-1'/>
                        <span className='spinner-inner-2'/>
                        <span className='spinner-inner-3'/>
                    </section>
                </article>
            )}

            {/* if gameStarted state is false or all questions have been answered show game status*/}
            {!gameStarted || questionNo === parseInt(gameSelect.questionsAmount) ? (

                <section id='game-select'>

                    <input id='questionsAmount-input' type='number' max={50} placeholder='Number of questions (max=50)'
                           onChange={handleStatus}/>

                    <select id='category-select' onChange={handleStatus}>
                        {CHALLENGE_CATEGORY.map((category, index) => (
                            <option
                                label={category.label}
                                value={category.value}
                                key={`${category.label}-${index}`}
                            />
                        ))}
                    </select>

                    <select id='difficulty-select' onChange={handleStatus}>
                        {DIFFICULTY.map((difficulty, index) => (
                            <option
                                label={difficulty.label}
                                value={difficulty.value}
                                key={`${difficulty.label}-${index}`}
                            />
                        ))}
                    </select>

                    <select id='type-select' onChange={handleStatus}>
                        {TYPE.map((type, index) => (
                                <option
                                    label={type.label}
                                    value={type.value}
                                    key={`${type.label}-${index}`}
                                />
                            )
                        )}
                    </select>

                    <button
                        className='btn'
                        onClick={startGame}
                        disabled={Number(gameSelect.questionsAmount) < 1}
                    >
                        Start Game
                    </button>

                </section>

                // if loading is false and score is reset display quiz section
            ) : !loading && score.length !== parseInt(gameSelect.questionsAmount) ? (

                <QuestionSection
                    questions={questions}
                    questionNo={questionNo}
                    handleNextQuestion={nextQuestion}
                    handleCheckAnswer={checkAnswer}
                    isBtnDisabled={nextBtnDisabled}
                    score={score}
                />
            ) : null
            }

        </React.Fragment>
    );
}

const QuestionSection = props => {

    const {questions, questionNo, handleNextQuestion, handleCheckAnswer, isBtnDisabled, score} = props;
    const currentQuestion = questions[questionNo];
    const possibleAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

    return (
        <article id='quiz-section'>

            <h3>Question {questionNo + 1} out of {questions.length}</h3>
            <h3>Score: {score}</h3>

            {/* using dangerouslySetInnerHTML to be able to parse the symbols. it's like using innerHTML in vanilla JS
                  NEVER USE THIS TYPE OF ATTRIBUTE IN REACT, because it is an opening to an XSS (cross-site scripting) attack,
                  but to be able to have a workaround on SoloLearn, i chose this way.
            */}
            <section id='question' dangerouslySetInnerHTML={{__html: currentQuestion.question}}/>

            <article id='answers-container'>
                {possibleAnswers.map((answer, index) => (
                    <section
                        className='possible-answers'
                        key={`${answer}-${index}`}
                        onClick={handleCheckAnswer}
                        data-unparsed={answer}
                        dangerouslySetInnerHTML={{__html: answer}}/>
                ))}
            </article>

            <button
                className='btn'
                onClick={handleNextQuestion}
                disabled={isBtnDisabled}
            >
                {questionNo + 1 === questions.length ? 'Check Result' : 'Next Question'}
            </button>

        </article>
    )
}
export default App;
