import React from 'react';


const ErrorSection = (props) => {

    const {handleErrorGame} = props;

    return (
        <article id='error-section'>
            <section id='error'>
                <h4>There are no results from the API for the selected combination</h4>
                <h4>This means there are no questions for the category and difficulty you selected</h4>
                <h4>Please try a different combination or a different difficulty for the selected category</h4>
                <button
                    className='btn'
                    onClick={handleErrorGame}
                >
                    Go Back
                </button>
            </section>
        </article>
    );
};

export default ErrorSection;