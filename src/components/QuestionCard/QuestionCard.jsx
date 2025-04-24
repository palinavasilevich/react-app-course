import { Button } from "../Button";

import cls from "./QuestionCard.module.css";

export const QuestionCard = () => {
  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: 1</div>
        <div>Not Completed</div>
      </div>
      <h5 className={cls.cardTitle}>Title</h5>
      <div className={cls.cardAnswers}>
        <span>short answer: </span>
        <p className={cls.cardAnswer}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ut.
        </p>
      </div>
      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
