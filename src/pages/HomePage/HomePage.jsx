import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";

// import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const { data: questions } = await axios.get(`${API_URL}/questions`);
      setQuestions(questions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <QuestionCardList questions={questions} />
    </>
  );
};
