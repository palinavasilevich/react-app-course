import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";

// import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      setIsLoading(true);

      // Simulate server request delay
      await delayFn();

      const { data: questions } = await axios.get(`${API_URL}/questions`);
      setQuestions(questions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <QuestionCardList questions={questions} />
    </>
  );
};
