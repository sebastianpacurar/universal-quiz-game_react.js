import React, {useState} from 'react';

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
    const [userAnswers, setUserAnswers] = useState(0);


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

    // TODO: need to fix this
    const nextQuestion = () => {
        setQuestionNo(questionNo + 1);

        if (questionNo === userAnswers) {
            setGameStarted(false);
        }
    }

    /*
        I used event bubbling here to be able to mark the right answer green and the user selected answer
          red. In case the user selects the right answer, then only the right answer will be marked
    */
    const checkAnswer = (e) => {
        const value = e.target.textContent
        const answers = e.target.parentNode.children;

        e.target.style.border = '1px solid #8a2be2';

        if (value === questions[questionNo].correct_answer) {
            e.target.style.backgroundColor = 'green';
            e.target.style.color = 'white';
        } else {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'white';

            for (let event of answers) {
                if (event.textContent === questions[questionNo].correct_answer) {
                    event.style.backgroundColor = 'green';
                    event.style.color = 'white';
                }
            }
        }
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
            {!gameStarted || userAnswers.length === parseInt(gameSelect.questionsAmount) ? (

                <section id='game-select'>

                    <select id='questionsAmount-select' onChange={handleStatus}>
                        <option disabled selected>Choose no of questions</option>
                        {Array.from(Array(46), (x, index) => index + 5).map((number) => (
                            <option
                                label={number}
                                value={number}
                                key={`number - ${number}`}
                            />
                        ))}
                    </select>

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
                        disabled={!Boolean(gameSelect.questionsAmount)}
                    >
                        Start Game
                    </button>

                </section>

                /* if gameStarted state is true and or all questions have not been answered, then if loading is false
                     display quiz section
                 */
            ) : !loading ? (

                <QuestionSection
                    questions={questions}
                    questionNo={questionNo}
                    nextQuestion={nextQuestion}
                    checkAnswer={checkAnswer}
                />
            ) : null
            }

        </React.Fragment>
    );
}

const QuestionSection = props => {

    const {questions, questionNo, nextQuestion, checkAnswer} = props;
    const currentQuestion = questions[questionNo];
    const possibleAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]

    return (
        <article id='quiz-section'>

            <p>Question {questionNo + 1} out of {questions.length}</p>

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
                        onClick={checkAnswer}
                        dangerouslySetInnerHTML={{__html: answer}}/>
                ))}
            </article>

            <button
                className='btn'
                onClick={nextQuestion}
                disabled={false}
            >
                {questionNo + 1 === questions.length ? 'Check Result' : 'Next Question'}
            </button>

        </article>
    )
}
export default App;
