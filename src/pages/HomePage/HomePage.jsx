import { useEffect, useMemo, useState } from "react";
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
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const { data: questions } = await axios.get(`${API_URL}/${url}`);

    setQuestions(questions);
    return questions;
  });

  const filteredQuestions = useMemo(
    () =>
      questions.filter((question) =>
        question.question
          .toLowerCase()
          .includes(searchValue.trim().toLocaleLowerCase())
      ),
    [questions, searchValue]
  );

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  };

  useEffect(() => {
    getQuestions(`questions?${sortSelectValue}`);
  }, [sortSelectValue]);

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          className={cls.select}
        >
          <option value="" disabled>
            sort by
          </option>

          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {filteredQuestions.length === 0 && (
        <p className={cls.noQuestionsFound}>No questions found...</p>
      )}

      <QuestionCardList questions={filteredQuestions} />
    </>
  );
};
