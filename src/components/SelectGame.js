import React from 'react';

// utils related
import {CHALLENGE_CATEGORY, DIFFICULTY} from '../utils/selectOptions';

const SelectGame = props => {

    const {handleStatus, handleStartGame, gameSelect, handleShowResults, questionsNumber, isResultDisplayed} = props;

    return (
        <article id='game-select'>

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

            <section id='btns-section'>
                <button
                    className='btn first-btn'
                    onClick={handleStartGame}
                    disabled={Number(gameSelect.questionsAmount) < 1}
                >
                    Start Game
                </button>

                {/* if there are no questions (the game didn't run at least once), do not render button*/}
                {questionsNumber > 0 && (
                    <button
                        className='btn'
                        onClick={handleShowResults}
                    >
                        {isResultDisplayed ? 'Hide Results' : 'Show Results'}
                    </button>
                )}
            </section>
        </article>
    );
};

export default SelectGame;