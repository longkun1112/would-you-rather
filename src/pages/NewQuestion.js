import React, { useEffect, useState } from "react";
import {
  Divider,
  Form,
  FormInput,
  Segment,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { addNewQuestion } from "../store/questionsSlice";
import { formatQuestion } from "../api/data";
import { addQuestionToUser } from "../store/usersSlice";
import './NewQuestion.css';
import { toast } from "react-toastify";

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = localStorage.getItem("auth")
      if (!auth) {
        navigate("/login");
      }
  }, [])

  const isDisabled = optionOneText === "" || optionTwoText === "";

  const handleInputOptionOne = (e, { value }) => {
    setOptionOneText(value);
  };

  const handleInputOptionTwo = (e, { value }) => {
    setOptionTwoText(value);
  };

  const handleSubmitAnswer = async () => {
    const newQuestion = formatQuestion({
      author: userId,
      optionOneText,
      optionTwoText,
    });

    dispatch(addNewQuestion(newQuestion));

    dispatch(addQuestionToUser({ userId, questionId: newQuestion.id }));
    toast.success('Question add successfully');
    navigate("/");
  };
  let location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("auth")
      if (!auth) {
        navigate("/login");
      }
      localStorage.setItem('location', location.pathname)
  }, [])

  return (
    <div className="container">
      <div className="newQuestionContainer">
        <Segment>
          <h2 className="new-ques-header">Create New Question</h2>

          <h5>Complete the question:</h5>
          <h3>Would you rather...</h3>

          <Form>
            <FormInput
              placeholder="Enter Option One Text Here"
              value={optionOneText}
              onChange={handleInputOptionOne}
              required
            />
            <Divider horizontal>OR</Divider>
            <FormInput
              placeholder="Enter Option Two Text Here"
              value={optionTwoText}
              onChange={handleInputOptionTwo}
              required
            />
            { 
                isDisabled ? 
                (
                  <div className="not-submmit-login-button">
                      Submit
                  </div>
                ) : (
                  <div className="login-button" onClick={handleSubmitAnswer}>
                      Submit
                  </div>
                )
              }
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default NewQuestion;
