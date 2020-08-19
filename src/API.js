export const fetchQuestions = async (questionsAmount, category, difficulty, type) => {

    let url = `https://opentdb.com/api.php?amount=${questionsAmount}`;

    if (Boolean(category)) url += `&category=${category}`;
    if (Boolean(difficulty)) url += `&difficulty=${difficulty}`;
    if (Boolean(type)) url += `&type=${type}`;

    const data = await (await fetch(url)).json();

    return data.results.map((question) => ({
            ...question
        }
    ));

}