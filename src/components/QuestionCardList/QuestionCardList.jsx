import { memo } from "react";
import { QuestionCard } from "../QuestionCard";

import cls from "./QuestionCardList.module.css";

export const QuestionCardList = memo(({ questions }) => {
  return (
    <div className={cls.cardList}>
      {questions.map((question) => {
        return <QuestionCard key={question.id} card={question} />;
      })}
    </div>
  );
});
