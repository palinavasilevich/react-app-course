import { useActionState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";

import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants";

import cls from "./AddQuestionPage.module.css";
import { Loader } from "../../components/Loader";

const createQuestionAction = async (_prevState, formData) => {
  try {
    // Simulate server request delay
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; // formData.get("clearForm")

    const { data: question } = await axios.post(`${API_URL}/questions`, {
      question: newQuestion.question,
      answer: newQuestion.answer,
      description: newQuestion.description,
      resources: resources.length ? resources.split(",") : [],
      level: Number(newQuestion.level),
      completed: false,
      editDate: undefined,
    });

    toast.success("New question successfully created!");

    return isClearForm ? {} : question;
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isLoading] = useActionState(
    createQuestionAction,
    { clearForm: true }
  );

  return (
    <>
      {isLoading && <Loader />}
      <h1 className={cls.title}>Add new question</h1>
      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
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
              defaultValue={formState.answer}
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
              defaultValue={formState.description}
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
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              placeholder="Please enter resources separated by commas"
            ></textarea>
          </div>

          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>

            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>

              <option value="1">1 - easy</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hard</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              defaultChecked={formState.clearForm}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              className={cls.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>

          <Button disabled={isLoading}>Add question</Button>
        </form>
      </div>
    </>
  );
};

export default AddQuestionPage;
