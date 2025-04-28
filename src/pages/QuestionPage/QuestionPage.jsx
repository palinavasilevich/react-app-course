import { useEffect, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useFetch } from "../../hooks/useFetch";

import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import { Loader, SmallLoader } from "../../components/Loader";

import { API_URL } from "../../constants";

import cls from "./QuestionPage.module.css";

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const getLevelVariant = () =>
    question.level === 1
      ? "primary"
      : question.level === 2
        ? "warning"
        : "alert";

  const getCompletedVariant = () =>
    question.completed === 1 ? "success" : "primary";

  const [getQuestion, isLoading] = useFetch(async () => {
    const { data: question } = await axios.get(`${API_URL}/questions/${id}`);

    setQuestion(question);
  });

  const [updateQuestion, isUpdateQuestionLoading] = useFetch(
    async (isCompleted) => {
      const { data: question } = await axios.patch(
        `${API_URL}/questions/${id}`,
        {
          completed: isCompleted,
        }
      );

      setQuestion(question);
    }
  );

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateQuestion(!isChecked);
  };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    question !== null && setIsChecked(question.completed);
  }, [question]);

  return (
    <>
      {isLoading && <Loader />}

      {question !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={getLevelVariant()}>Level: {question.level}</Badge>
            <Badge variant={getCompletedVariant()}>
              {question.completed ? "Completed" : "Not Completed"}
            </Badge>
            {question?.editDate && (
              <p className={cls.editDate}>Edited: {question.editDate}</p>
            )}
          </div>
          <h5 className={cls.cardTitle}>{question.question}</h5>
          <p className={cls.cardDescription}>{question.description}</p>
          <div className={cls.cardAnswers}>
            <span>short answer: </span>
            <p className={cls.cardAnswer}>{question.answer}</p>
          </div>

          <ul className={cls.cardResources}>
            Resources:
            {question.resources.map((resource, index) => {
              return (
                <li key={index}>
                  <a href={resource.trim()} target="_blank" rel="noreferrer">
                    {resource.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isUpdateQuestionLoading}
            />

            <span>mark question as completed</span>
            {isUpdateQuestionLoading && <SmallLoader />}
          </label>

          <Button
            onClick={() => navigate(`/editquestion/${question.id}`)}
            isDisabled={isUpdateQuestionLoading}
          >
            Edit Question
          </Button>
          <Button
            onClick={() => navigate("/")}
            isDisabled={isUpdateQuestionLoading}
          >
            Back
          </Button>
        </div>
      )}
    </>
  );
};
