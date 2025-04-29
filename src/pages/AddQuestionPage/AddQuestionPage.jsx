import { Button } from "../../components/Button";
import cls from "./AddQuestionPage.module.css";

export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={cls.title}>Add new question</h1>
      <div className={cls.formContainer}>
        <form action="" className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={"defaultValue"}
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
              defaultValue={"defaultValue"}
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
              defaultValue={"defaultValue"}
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
              defaultValue={"defaultValue"}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              required
              placeholder="Please enter resources separated by commas"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>

            <select name="level" id="levelField" defaultValue={"defaultValue"}>
              <option disabled>Question level</option>

              <option value="1">1 - easy</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hard</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              defaultValue={true}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              className={cls.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>

          <Button>Add question</Button>
        </form>
      </div>
    </>
  );
};
