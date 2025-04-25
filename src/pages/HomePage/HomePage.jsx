import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";

import { useFetch } from "../../hooks/useFetch";

// import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const { data: questions } = await axios.get(`${API_URL}/${url}`);
    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions("questions");
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList questions={questions} />
    </>
  );
};
