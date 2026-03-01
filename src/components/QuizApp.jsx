import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
        `https://opentdb.com/api.php?amount=10&category=${selected}&type=multiple`
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
    <div className="min-h-screen w-full text-white flex items-center justify-center px-4">

      <div className="w-full max-w-xl">

        {!quizStarted && !quizFinished && (
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold tracking-wide">PRIMAL QUIZ</h1>
            <p className="text-gray-400 mt-3">Choose your battlefield</p>
          </div>
        )}

        
        {!quizStarted && !quizFinished && (
          <form
            onSubmit={startQuiz}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl"
          >
            <label htmlFor="category" className="block mb-3 text-gray-300">
              Select Subject
            </label>

            <select
              id="category"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full bg-[#2A2A2A] border border-gray-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">Choose a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Start Quiz
            </button>
          </form>
        )}

        
        {quizStarted && !quizFinished && questions.length > 0 && (
          <div className="relative w-125 max-w-xl mx-auto min-h-125 pt-12">

            {questions.slice(0, currentIndex + 1).map((question, index) => {

              const offset = currentIndex - index;
              const isCurrent = index === currentIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: isCurrent ? 1 : 0.9,
                    y: isCurrent ? 50 : offset * -18,
                    scale: isCurrent ? 1 : 1 - offset * 0.03
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute top-0 left-0 w-full rounded-2xl p-10 text-center border ${
                    isCurrent
                      ? "bg-[#2A2A2A] border-gray-700 shadow-2xl"
                      : "bg-white/5 border-white/10 backdrop-blur-md shadow-xl"
                  }`}
                  style={{ zIndex: 100 - offset }}
                  >

                  <p className="text-gray-400 mb-3">
                    #{index + 1}
                  </p>

                  <h2
                    className="text-xl font-medium mb-8 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />

                  {isCurrent && (
                    <div className="space-y-4">
                      {[...question.incorrect_answers, question.correct_answer]
                        .sort(() => Math.random() - 0.5)
                        .map((answer, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswer(answer)}
                            className="w-full bg-[#2A2A2A] hover:bg-white hover:text-black transition py-3 rounded-lg border border-gray-700"
                            dangerouslySetInnerHTML={{ __html: answer }}
                          />
                        ))}
                    </div>
                  )}

                </motion.div>
              );
            })}

          </div>
        )}

       
        {quizFinished && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center shadow-2xl">

            <h2 className="text-3xl font-bold mb-4">Quiz Finished</h2>

            <p className="text-lg text-gray-300 mb-8">
              Your Score: <span className="font-bold text-white">{score}</span> / {questions.length}
            </p>

            <button
              onClick={() => setQuizFinished(false)}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Play Again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
