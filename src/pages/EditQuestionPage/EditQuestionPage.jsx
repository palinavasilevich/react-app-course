import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Loader } from "../../components/Loader";

import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { EditQuestion } from "./EditQuestion";

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
    const { data } = await axios.get(`${API_URL}/questions/${id}`);
    setQuestion(data);
  });

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <>
      {isQuestionLoading && <Loader />}{" "}
      {question && <EditQuestion initialState={question} />}
    </>
  );
};

export default EditQuestionPage;
