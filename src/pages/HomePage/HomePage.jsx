import { useEffect, useState } from "react";
import axios from "axios";

import { QuestionCard } from "../../components/QuestionCard";

import { API_URL } from "../../constants";

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
      {questions.map((card) => {
        return <QuestionCard key={card.id} card={card} />;
      })}
      <button onClick={() => getQuestions()}>get questions</button>
    </>
  );
};
