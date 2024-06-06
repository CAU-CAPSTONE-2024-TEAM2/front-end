export const getRandomQuestions = (totalQuestions, numQuestions) => {
    const selectedQuestions = new Set();
    while (selectedQuestions.size < numQuestions) {
      const randomNumber = Math.floor(Math.random() * totalQuestions) + 1;
      selectedQuestions.add(randomNumber);
    }
    return Array.from(selectedQuestions);
  };
