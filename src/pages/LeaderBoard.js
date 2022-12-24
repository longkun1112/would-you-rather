import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LeaderBoardCard from "../components/LeaderBoardCard"; 
import { mapValues, orderBy } from "lodash";
import "./LeaderBoard.css";
import { useLocation, useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("auth")
      if (!auth) {
        navigate("/login");
      }
  }, [])

  const leaderBoardList = () => {
    const _leaderBoardList = [];

    mapValues(users, (user) => {
      const { name, avatarURL, answers, questions } = user;

      _leaderBoardList.push({
        name,
        avatarURL,
        answeredQuestions: Object.keys(answers).length,
        createdQuestions: questions.length,
        totalScore: Object.keys(answers).length + questions.length,
      });
    });

    return orderBy(_leaderBoardList, "totalScore", "desc").slice(0, 3);
  };
  let location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("auth")
      if (!auth) {
        navigate("/login");
      }
      localStorage.setItem('location', location.pathname)

      console.log(location);
  }, [])

  return (
     <div className="container">
      <div className="leaderBoardContainer">
        {leaderBoardList().map((leaderBoardData, index) => (
          <LeaderBoardCard leaderBoardData={leaderBoardData} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;