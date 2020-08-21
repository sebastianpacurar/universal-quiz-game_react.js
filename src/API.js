import {shuffleArray} from './utils/helperFunctions';

export const fetchQuestions = async (questionsAmount, category, difficulty) => {

    let url = `https://opentdb.com/api.php?amount=${questionsAmount}`;
    if (Boolean(category)) url += `&category=${category}`;
    if (Boolean(difficulty)) url += `&difficulty=${difficulty}`;

    const data = await (await fetch(url)).json();

    return data.results.map((question) => ({
            ...question,
            allAnswers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ));
};