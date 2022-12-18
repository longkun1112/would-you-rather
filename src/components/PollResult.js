import React from "react";
import PropTypes from "prop-types";
import {
  SegmentGroup,
  Grid,
  GridColumn,
  Segment,
  Label,
  Icon,
  Progress,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './PollResult.css';

const PollResult = ({ questionData, author }) => {

  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const optionOneVotes = questionData.optionOne.votes.length;
  const optionTwoVotes = questionData.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const isVote = (option) => {
    return questionData[option].votes.includes(userId);
  };

  const vote_Color = (option) => {
    return questionData[option].votes.includes(userId) ? "green" : "grey";
  };

  const renderYourVoteLabel = () => {
    return (
      <Label color="yellow" ribbon="right">
        <Icon name="check circle outline" size="big" />
        <p style={{ float: "right" }}>Your Vote</p>
      </Label>
    );
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <SegmentGroup>
      <h5 className="poll-result-author">
        {author.name} asks:
      </h5>

      <Grid divided padded>
        <GridColumn width={5} verticalAlign="middle">
          <img alt="" className="poll-img" src={author.avatarURL} />
        </GridColumn>

        <GridColumn width={11}>
          <h3>Results:</h3>

          <Segment color={vote_Color("optionOne")}>
            {isVote("optionOne") && renderYourVoteLabel()}
            <h5>{questionData.optionOne.text}</h5>
            <Progress
              percent={((optionOneVotes / totalVotes) * 100).toFixed(0)}
              progress
              color={vote_Color("optionOne")}
            />
            <p>
              {optionOneVotes} out of {totalVotes} votes
            </p>
          </Segment>

          <Segment color={vote_Color("optionTwo")}>
            {isVote("optionTwo") && renderYourVoteLabel()}
            <h5>{questionData.optionTwo.text}</h5>
            <Progress
              percent={((optionTwoVotes / totalVotes) * 100).toFixed(0)}
              progress
              color={vote_Color("optionTwo")}
            />
            <p>
              {optionTwoVotes} out of {totalVotes} votes
            </p>
          </Segment>

          <div className="poll-button" onClick={handleGoBack}>
            Go back
          </div>
        </GridColumn>
      </Grid>
    </SegmentGroup>
  );
};

PollResult.propTypes = {
  questionData: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PollResult;