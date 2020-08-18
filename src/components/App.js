import React, {useState} from 'react';

// utils related
import {CHALLENGE_CATEGORY, TYPE, DIFFICULTY} from '../utils/utils';


function App() {

    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);

    const startGame = (e) => {

    }

    return (
        <React.Fragment>
            <select id='category-select'>
                {CHALLENGE_CATEGORY.map((category, index) => (
                        <option label={category.label} value={category.value} key={`${category}-${index}`}/>
                    )
                )}
            </select>

            <select id='type-select'>
                {DIFFICULTY.map((difficulty, index) => (
                        <option label={difficulty.label} value={difficulty.value} key={`${difficulty}-${index}`}/>
                    )
                )}
            </select>

            <select id='difficulty-select'>
                {TYPE.map((type, index) => (
                        <option label={type.label} value={type.value} key={`${type}-${index}`}/>
                    )
                )}
            </select>

            <button onClick={startGame}>Start Game</button>

        </React.Fragment>
    );
}

export default App;
