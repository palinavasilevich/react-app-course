import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

import { useFetch } from "../../hooks/useFetch";
import { API_URL, DEFAULT_PER_PAGE } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { Button } from "../../components/Button";

import cls from "./HomePage.module.css";

export const HomePage = () => {
  const [questions, setQuestions] = useState({});
  const [searchParams, setSearchParams] = useState(
    `_page=1&_per_page=${DEFAULT_PER_PAGE}`
  );
  const [searchValue, setSearchValue] = useState("");

  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");

  const controlsContainerRef = useRef();

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const { data: questions } = await axios.get(`${API_URL}/${url}`);

    setQuestions(questions);
    return questions;
  });

  const filteredQuestions = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((item) =>
          item.question
            .toLowerCase()
            .includes(searchValue.trim().toLocaleLowerCase())
        );
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const pagination = useMemo(() => {
    const totalQuestionsCount = questions?.pages || 0;

    return Array(totalQuestionsCount)
      .fill(0)
      .map((_, index) => index + 1);
  }, [questions]);

  const getActivePageNumber = () =>
    questions.next === null ? questions.last : questions.next - 1;

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(`_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(`_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `_page=${e.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`
      );

      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getQuestions(`questions?${searchParams}`);
  }, [searchParams]);

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

        <select
          value={countSelectValue}
          onChange={onCountSelectChangeHandler}
          className={cls.select}
        >
          <option disabled>count</option>

          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList questions={filteredQuestions} />

      {filteredQuestions.length === 0 ? (
        <p className={cls.noQuestionsFound}>No questions found...</p>
      ) : (
        pagination.length > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => {
              return (
                <Button key={value} isActive={value === getActivePageNumber()}>
                  {value}
                </Button>
              );
            })}
          </div>
        )
      )}
    </>
  );
};
