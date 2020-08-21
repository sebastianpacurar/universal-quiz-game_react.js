import React, {useState, useEffect} from 'react';

// fetch method
import {fetchQuestions} from '../API';

// components related
import QuestionSection from './QuestionSection';
import SelectGame from './SelectGame';
import ResultsTable from './ResultsTable';

const App = () => {
    const [gameSelect, setGameSelect] = useState({
        category: "",
        difficulty: "",
        questionsAmount: "",
    });
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [showResults, setShowResults] = useState(false);


    const handleStatus = e => {
        const key = e.target.id.split('-')[0];
        const value = e.target.value;

        setGameSelect({
            ...gameSelect, [key]: value
        });
    }

    const startGame = async () => {
        setGameStarted(true);
        setLoading(true);
        const questions = await (fetchQuestions(
            gameSelect.questionsAmount,
            gameSelect.category,
            gameSelect.difficulty,
        ));

        setQuestions(questions);
        setShowResults(false);
        setLoading(false);
    }

    const nextQuestion = () => {
        setQuestionNumber(questionNumber + 1);
        setNextBtnDisabled(!nextBtnDisabled);
    }

    // when questionsNumber reaches the questionAmount the user selected, end the game
    useEffect(() => {
        if (questionNumber === parseInt(gameSelect.questionsAmount)) {
            setGameStarted(false);
            setQuestionNumber(0);
            setScore(0);
        }
    }, [questionNumber, gameSelect.questionsAmount]);

    /*
        I used event bubbling here to be able to mark the right answer green and the user selected answer
          red. In case the user selects the right answer, then only the right answer will be marked;
          Also increment score by one
        The reason for using the data-unparsed custom attribute in the option tag,
         is because the text symbols are encoded and will return false positive answers when the answer
         contains symbols
    */
    const checkAnswer = e => {
        const value = e.target.attributes.getNamedItem('data-unparsed').value;
        const answers = e.target.parentNode.children;

        // in case the answer has been already selected, do nothing
        for (let event of answers) {
            if (event.style.backgroundColor === 'red' || event.style.backgroundColor === 'green') {
                return;
            }
        }

        e.target.style.border = '1px solid #8a2be2';

        if (value === questions[questionNumber].correct_answer) {
            e.target.style.backgroundColor = 'green';
            e.target.style.color = 'white';
            setScore(score + 1);
        } else {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'white';

            for (let event of answers) {
                if (event.attributes.getNamedItem('data-unparsed').value === questions[questionNumber].correct_answer) {
                    event.style.backgroundColor = 'green';
                    event.style.color = 'white';
                }
            }
        }
        setNextBtnDisabled(!nextBtnDisabled);
    }

    const revealResults = () => {
        setShowResults(!showResults);
    }

    return (
        <>

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
            {!gameStarted || questionNumber === parseInt(gameSelect.questionsAmount) ? (
                <>
                    <SelectGame
                        gameSelect={gameSelect}
                        handleStartGame={startGame}
                        handleStatus={handleStatus}
                        handleShowResults={revealResults}
                        questionsNumber={questions.length}
                        isResultDisplayed={showResults}
                    />

                    {/*if show result state is true, display results table*/}
                    {showResults && (

                        <ResultsTable questions={questions}/>

                    )}
                </>
                // if loading is false and score is reset display quiz section
            ) : !loading && score.length !== parseInt(gameSelect.questionsAmount) ? (

                <QuestionSection
                    questions={questions}
                    questionNo={questionNumber}
                    handleNextQuestion={nextQuestion}
                    handleCheckAnswer={checkAnswer}
                    isBtnDisabled={nextBtnDisabled}
                    score={score}
                />
            ) : null
            }

        </>
    );
}

export default App;
