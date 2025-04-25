import { QuestionCard } from "../QuestionCard";

import cls from "./QuestionCardList.module.css";

export const QuestionCardList = ({ questions }) => {
  return (
    <div className={cls.cardList}>
      {questions.map((question) => {
        return <QuestionCard key={question.id} card={question} />;
      })}
    </div>
  );
};
