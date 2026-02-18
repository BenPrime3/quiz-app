import axios from 'axios';

const getQuestions = async (amount, category, difficulty, type) => {

  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`)

  return response.results
}

export default getQuestions;