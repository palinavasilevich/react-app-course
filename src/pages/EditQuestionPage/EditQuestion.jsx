import { useActionState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { QuestionForm } from "../../components/QuestionForm/QuestionForm";
import { Loader } from "../../components/Loader";

import { delayFn } from "../../helpers/delayFn";

import { API_URL } from "../../constants";

import cls from "./EditQuestionPage.module.css";

const editQuestionAction = async (_prevState, formData) => {
  try {
    // Simulate server request delay
    await delayFn();

    const editedQuestion = Object.fromEntries(formData);
    const resources = editedQuestion.resources.trim();
    const isClearForm = editedQuestion.clearForm;
    const questionId = editedQuestion.questionId;

    const { data: question } = await axios.patch(
      `${API_URL}/questions/${questionId}`,
      {
        question: editedQuestion.question,
        answer: editedQuestion.answer,
        description: editedQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(editedQuestion.level),
        completed: false,
        editDate: undefined,
      }
    );

    toast.success("The question successfully edited!");

    return isClearForm ? {} : question;
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const [formState, formAction, isLoading] = useActionState(
    editQuestionAction,
    {
      ...initialState,
      clearForm: false,
    }
  );

  return (
    <>
      {isLoading && <Loader />}
      <h1 className={cls.title}>Edit question</h1>
      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isLoading={isLoading}
          submitBtnText="Edit question"
        />
      </div>
    </>
  );
};
