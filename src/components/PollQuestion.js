import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SegmentGroup,
  Grid,
  GridColumn,
  Form,
  FormField,
  Radio,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswerToUser } from "../store/usersSlice";
import { addAnswerToQuestion } from "../store/questionsSlice";
import { toast } from "react-toastify";
import "./PollQuestion.css";

const PollQuestion = ({ questionData, author }) => {
  const [selection, setSelection] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isDisabled = selection === "";

  const handleSelectQuestion = (e, { value }) => {
    setSelection(value);
  };

  const handleSubmitAnswer = () => {
    dispatch(
      addAnswerToUser({ userId, questionId: questionData.id, selection })
    );

    dispatch(
      addAnswerToQuestion({ userId, questionId: questionData.id, selection })
    );

    toast.success("Submit successfully");
  };

  return (
    <SegmentGroup>
      <h5 className="poll-ques-author">{author.name} asks:</h5>

      <Grid divided padded>
        <GridColumn width={4}>
          <img alt="" className="poll-ques-img" src={author.avatarURL} />
        </GridColumn>
        <GridColumn width={12}>
          <h5>Would You Rather?</h5>
          <Form onSubmit={handleSubmitAnswer}>
            <FormField>
              <Radio
                label={questionData.optionOne.text}
                value="optionOne"
                checked={selection === "optionOne"}
                onChange={handleSelectQuestion}
              />
              <br />
              <Radio
                label={questionData.optionTwo.text}
                value="optionTwo"
                checked={selection === "optionTwo"}
                onChange={handleSelectQuestion}
              />
            </FormField>
            <FormField>
              { 
                isDisabled ? 
                (
                  <div className="not-submmit-poll-ques-button">
                      Submit
                  </div>
                ) : (
                  <div className="poll-ques-button" onClick={handleSubmitAnswer}>
                      Submit
                  </div>
                )
              }
            </FormField>
          </Form>
        </GridColumn>
      </Grid>
    </SegmentGroup>
  );
};

PollQuestion.propTypes = {
  questionData: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PollQuestion;
