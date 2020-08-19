import React, {useState} from 'react';

// utils related
import {CHALLENGE_CATEGORY, TYPE, DIFFICULTY} from '../utils/utils';

import {fetchQuestions} from '../API';

function App() {

    const [gameStatus, setGameStatus] = useState({
        category: "",
        difficulty: "",
        type: "",
        questionsAmount: 10,
    });
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);


    const handleStatus = (e) => {
        const key = e.target.id.split('-')[0];
        const value = e.target.value;

        setGameStatus({
            ...gameStatus, [key]: value
        })
    }


    const startGame = async () => {
        setLoading(true);
        const questions = await (fetchQuestions(
            gameStatus.questionsAmount,
            gameStatus.category,
            gameStatus.difficulty,
            gameStatus.type
        ));

        setQuestions(questions);

        setLoading(false);
        setGameStarted(true);
    }

    return (
        <React.Fragment>

            <h1>Universal Quiz Game</h1>


            {!gameStarted && (

                <section className='game-status'>

                    <select id='amount-select' onChange={handleStatus}>
                        {Array.from(Array(50), (x, index) => index + 1).map((number) => (
                                <option
                                    label={number}
                                    value={number}
                                    key={`number - ${number}`}
                                />
                            )
                        )}
                    </select>

                    <select id='category-select' onChange={handleStatus}>
                        {CHALLENGE_CATEGORY.map((category, index) => (
                                <option
                                    label={category.label}
                                    value={category.value}
                                    key={`${category.label}-${index}`}
                                />
                            )
                        )}
                    </select>

                    <select id='difficulty-select' onChange={handleStatus}>
                        {DIFFICULTY.map((difficulty, index) => (
                                <option
                                    label={difficulty.label}
                                    value={difficulty.value}
                                    key={`${difficulty.label}-${index}`}
                                />
                            )
                        )}
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

                    <button id='start-btn' onClick={startGame}>Start Game</button>

                </section>


            )}

        </React.Fragment>
    );
}

export default App;
