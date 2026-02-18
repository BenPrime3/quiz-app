import { useEffect, useState } from "react";
import axios from "axios";

export default function QuizApp() {

  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState("");

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

  return (
    <form>
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
    </form>
  );
}
