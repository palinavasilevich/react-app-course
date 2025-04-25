import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";

import { useFetch } from "../../hooks/useFetch";

import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput/SearchInput";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const { data: questions } = await axios.get(`${API_URL}/${url}`);
    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions("questions");
  }, []);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList questions={questions} />
    </>
  );
};
