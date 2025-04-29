import { Button } from "../Button";

import cls from "./QuestionForm.module.css";

export const QuestionForm = ({
  formAction,
  state,
  isLoading,
  submitBtnText,
}) => {
  return (
    <form action={formAction} className={cls.form}>
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question: </label>
        <textarea
          defaultValue={state.question}
          name="question"
          id="questionField"
          cols="30"
          rows="2"
          required
          placeholder="Please enter a question"
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="answerField">Short Answer: </label>
        <textarea
          defaultValue={state.answer}
          name="answer"
          id="answerField"
          cols="30"
          rows="2"
          required
          placeholder="Please enter a short answer"
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Short Answer: </label>
        <textarea
          defaultValue={state.description}
          name="description"
          id="descriptionField"
          cols="30"
          rows="5"
          required
          placeholder="Please enter a description"
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="resourcesField">Resources: </label>
        <textarea
          defaultValue={state.resources}
          name="resources"
          id="resourcesField"
          cols="30"
          rows="5"
          placeholder="Please enter resources separated by commas"
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="levelField">Level: </label>

        <select name="level" id="levelField" defaultValue={state.level}>
          <option disabled>Question level</option>

          <option value="1">1 - easy</option>
          <option value="2">2 - medium</option>
          <option value="3">3 - hard</option>
        </select>
      </div>

      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input
          defaultChecked={state.clearForm}
          type="checkbox"
          name="clearForm"
          id="clearFormField"
          className={cls.checkbox}
        />
        <span>clear form after submitting?</span>
      </label>

      <Button disabled={isLoading}>{submitBtnText}</Button>
    </form>
  );
};
