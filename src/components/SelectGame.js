import React from 'react';
import PropTypes from 'prop-types';

// import the styling
import '../sass/framework/SelectGame.sass';

// utils related
import {CHALLENGE_CATEGORY, DIFFICULTY} from '../utils/selectOptions';


const SelectGame = props => {

    const {handleStatus, handleStartGame, handleShowResults, questions, isResultDisplayed} = props;

    // get rid of the status property
    delete questions.status;

    return (
        <>
            <form id='game-select' onSubmit={handleStartGame}>

                <input
                    id='questionsAmount-input'
                    type='text'
                    pattern='^(?:[1-9]\d?)$'
                    placeholder='Number of questions (max=50)'
                    required
                    onChange={handleStatus}
                />

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

                <button className='btn first-btn'>
                    Start Game
                </button>
            </form>

            {/* if there are no questions (the game didn't run at least once), do not render button*/}
            {Object.keys(questions).length > 0 && (
                <section className='results'>
                    <button
                        className='btn'
                        onClick={handleShowResults}
                    >
                        {isResultDisplayed ? 'Hide Results' : 'Show Results'}
                    </button>
                </section>
            )}
        </>
    );
};


// type checking
SelectGame.propTypes = {
    questions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    handleStatus: PropTypes.func.isRequired,
    handleStartGame: PropTypes.func.isRequired,
    handleShowResults: PropTypes.func.isRequired,
    isResultDisplayed: PropTypes.bool.isRequired
}


export default SelectGame;