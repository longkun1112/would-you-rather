import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./pages/PrivateRoute";
import Home from "./pages/Home";
import LeaderBoard from "./pages/LeaderBoard";
import Login from "./pages/Login";
import NewQuestion from "./pages/NewQuestion";
import NotFound from "./pages/NotFound";
import QuestionDetail from "./pages/QuestionDetail";
import { _getQuestions, _getUsers } from "./api/data";
import { receiveUsers } from "./store/usersSlice";
import { receiveQuestions } from "./store/questionsSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  const initializeDataApp = async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();

    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  };

  useEffect(() => {
    initializeDataApp();
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<NewQuestion />} />
          <Route path="/question/:questionId" element={<QuestionDetail />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
