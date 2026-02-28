import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizApp() {

  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {

    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api_category.php"
        );

        setSubjects(response.data.trivia_categories);

      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();

  }, []);

  async function startQuiz(e) {
  e.preventDefault();

    if (!selected) return;

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=5&category=${selected}&type=multiple`
      );

      setQuestions(response.data.results);
      setQuizStarted(true);
      setQuizFinished(false);
      setCurrentIndex(0);
      setScore(0);

    }
    catch (error) {
      console.error(error);
    }
  }

    function handleAnswer(answer) {
      if (answer === questions[currentIndex].correct_answer) {
        setScore((prev) => prev + 1);
      }

      const next = currentIndex + 1;

      if (next < questions.length) {
        setCurrentIndex(next);
      } else {
        setQuizFinished(true);
        setQuizStarted(false);
      }
    }

  return (

    <>
      <form onSubmit={startQuiz}>
        <label htmlFor="category">Choose a subject</label>

        <select
          name="category"
          id="category"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select a subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}

        </select>

        <button type="submit">Start Quiz</button>
      </form>

      {quizStarted && !quizFinished && questions.length > 0 && (
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }} />

          {[...questions[currentIndex].incorrect_answers,
            questions[currentIndex].correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
        </div>
      )}

      {quizFinished && (
        <div>
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={() => setQuizFinished(false)}>
            Play Again
          </button>
        </div>
      )}
    </>
    
  );
}
