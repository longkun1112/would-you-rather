import React, { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { mapValues, orderBy } from "lodash";
import "./Home.css";
import QuestionCard from "../components/QuestionCard";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const { userId } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { questions } = useSelector((state) => state.questions);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("auth")
      if (!auth) {
        navigate("/login");
      }
      localStorage.setItem('location', location.pathname)

  }, [])

  const answeredQuestions = () => {
    const answeredQuestionsList = [];

    mapValues(questions, (question) => {
      if (Object.keys(users[userId].answers).includes(question.id)) {
        answeredQuestionsList.push(question);
      }
    });

    return orderBy(answeredQuestionsList, "timestamp", "desc");
  };

  const unansweredQuestions = () => {
    const unansweredQuestionsList = [];

    mapValues(questions, (question) => {
      if (!Object.keys(users[userId].answers).includes(question.id)) {
        unansweredQuestionsList.push(question);
      }
    });

    return orderBy(unansweredQuestionsList, "timestamp", "desc");
  };

  const panes = [
    {
      menuItem: "Unanswered",
      render: () => (
        <Tab.Pane>
          {unansweredQuestions().map((question) => (
            <QuestionCard
              key={question.id}
              questionData={question}
              author={users[question.author]}
              isAnswered={false}
            />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {answeredQuestions().map((question) => (
            <QuestionCard
              key={question.id}
              questionData={question}
              author={users[question.author]}
              isAnswered={true}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="homeContainer">
        <Tab panes={panes} menu={{ secondary: true, pointing: true }} />
      </div>
    </div>
  );
};

export default Home;
