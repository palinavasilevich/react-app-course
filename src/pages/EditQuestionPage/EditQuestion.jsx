import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { QuestionForm } from "../../components/QuestionForm/QuestionForm";
import { Loader } from "../../components/Loader";

import { delayFn } from "../../helpers/delayFn";
import { dateFormat } from "../../helpers/dateFormat";
import { useFetch } from "../../hooks/useFetch";

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
        editDate: dateFormat(new Date()),
      }
    );

    toast.success("The question has been successfully edited!");

    return isClearForm ? {} : question;
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = ({ initialState = {} }) => {
  const navigate = useNavigate();

  const [formState, formAction, isEditQuestionLoading] = useActionState(
    editQuestionAction,
    {
      ...initialState,
      clearForm: false,
    }
  );

  const [removeQuestion, isRemoveQuestionLoading] = useFetch(async () => {
    await axios.delete(`${API_URL}/questions/${initialState?.id}`);

    toast.success("The question has been successfully deleted!");
    navigate("/");
  });

  const onRemoveQuestionHandler = async () => {
    const isRemove = confirm("Are you sure you want to delete this question?");

    isRemove && removeQuestion();
  };

  return (
    <>
      {(isEditQuestionLoading || isRemoveQuestionLoading) && <Loader />}
      <h1 className={cls.title}>Edit question</h1>
      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          disabled={isEditQuestionLoading || isRemoveQuestionLoading}
          onClick={onRemoveQuestionHandler}
        >
          X
        </button>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isLoading={isEditQuestionLoading || isRemoveQuestionLoading}
          submitBtnText="Edit question"
        />
      </div>
    </>
  );
};
