import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  GridColumn,
  Label,
  Segment,
  Divider,
  SegmentGroup,
} from "semantic-ui-react";
import './LeaderBoardCard.css';

const LeaderBoardCard = ({ leaderBoardData, index }) => {
  const { name, avatarURL, answeredQuestions, createdQuestions, totalScore } =
    leaderBoardData;

  const rankingColorLabel = ["yellow", "grey", "orange"];

  return (
    <Segment>
      <Label corner="left" icon="trophy" color={rankingColorLabel[index]} />
      <Grid divided padded>
        <GridColumn width={4} verticalAlign="middle">
          <img className="leader-img" src={avatarURL} alt=""/>
        </GridColumn>

        <GridColumn width={8}>
          <h3>{name}</h3>
          <Grid>
            <div className="grid-left">Answered questions</div>
            <div className="grid-right">{answeredQuestions}</div>
          </Grid>
          <Divider />
          <Grid>
            <div className="grid-left">Created questions</div>
            <div className="grid-right">{createdQuestions}</div>
          </Grid>
        </GridColumn>

        <GridColumn width={4} textAlign="center">
          <SegmentGroup>
            <h5 className="leaderboard-header">Score</h5>
            <Segment>
              <div className="total-score">
                {totalScore}
              </div>
            </Segment>
          </SegmentGroup>
        </GridColumn>
      </Grid>
    </Segment>
  );
};

LeaderBoardCard.propTypes = {
  leaderBoardData: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default LeaderBoardCard;
