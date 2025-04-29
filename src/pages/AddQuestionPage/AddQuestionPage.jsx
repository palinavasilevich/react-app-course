import { useActionState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../components/Button";

import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants";

import cls from "./AddQuestionPage.module.css";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm/QuestionForm";

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
        <QuestionForm
          formAction={formAction}
          state={formState}
          isLoading={isLoading}
          submitBtnText="Add question"
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
