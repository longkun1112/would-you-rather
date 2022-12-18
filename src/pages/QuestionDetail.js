import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./QuestionDetail.css";
import PollResult from "../components/PollResult";
import PollQuestion from "../components/PollQuestion";


const QuestionDetail = () => {

  const navigate = useNavigate();
  const { questionId } = useParams();
  const { users } = useSelector((state) => state.users);
  const { userId } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.questions);

  const isAnsweredQuestion = useMemo(() => {
    return Object.keys(users[userId].answers).includes(questionId);
  }, [questionId, userId, users]);

  const isValidQuestion = useMemo(() => {
    return Object.keys(questions).includes(questionId);
  }, [questions, questionId]);

  useEffect(() => {
    if (!isValidQuestion) {
      navigate("/notfound");
    }
  }, [navigate, isValidQuestion]);

  return (
    <div className="container">
      <div className="questionContainer">
        {isValidQuestion &&
          (!isAnsweredQuestion ? (
            <PollQuestion
              questionData={questions[questionId]}
              author={users[questions[questionId].author]}
            />
          ) : (
            <PollResult
              questionData={questions[questionId]}
              author={users[questions[questionId].author]}
            />
          ))}
      </div>
    </div>
  )
}

export default QuestionDetail;