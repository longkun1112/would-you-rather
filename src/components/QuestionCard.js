import React from "react";
import {
  SegmentGroup,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import './QuestionCard.css';

const QuestionCard = ({ questionData, author, isAnswered }) => {
    const navigate = useNavigate();

    const buttonText = isAnswered ? "View Result" : "View Poll";

    const buttonColor = isAnswered ? "#21ba45" : "#2185d0";

    const handleClickNavigation = () => {
        navigate(`/question/${questionData.id}`);
    };

    return (
        <SegmentGroup>
            <h5 className="ques-card-header">{author.name} asks:</h5>
            <Grid divided padded>
                <GridColumn width={4}>
                    <img alt="" className="ques-card-img" src={author.avatarURL}/>
                </GridColumn>
                <GridColumn width={12}>
                    <h5>Would You Rather?</h5>
                    <p>... {questionData.optionOne.text} ...</p>
                    <div className="ques-card-button" style={{background: buttonColor}} onClick={handleClickNavigation}>
                        {buttonText}
                    </div>
                </GridColumn>
            </Grid>
        </SegmentGroup>
    );
};

export default QuestionCard;