import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";

function App() {
  const [questionNum, setQuestionNum] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$0");
  const [endOfQuestion, setEndOfQuestion] = useState(false);

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
    {
      id: 4,
      question:
        "Which Disney character famously leaves a glass slipper behind at a royal ball?",
      answers: [
        {
          text: "Sleeping Beauty",
          correct: false,
        },
        {
          text: "Else",
          correct: false,
        },
        {
          text: "Ariel",
          correct: false,
        },
        {
          text: "Cinderella",
          correct: true,
        },
      ],
    },
    {
      id: 5,
      question:
        "Which of these brands was chiefly associated with the manufacture of household locks?",
      answers: [
        {
          text: "Phillips",
          correct: false,
        },
        {
          text: "Flymo",
          correct: false,
        },
        {
          text: "Chubb",
          correct: true,
        },
        {
          text: "Sony",
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(() => {
    return [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 500" },
      { id: 5, amount: "$ 1000" },
      { id: 6, amount: "$ 2000" },
      { id: 7, amount: "$ 4000" },
      { id: 8, amount: "$ 8000" },
      { id: 9, amount: "$ 16000" },
      { id: 10, amount: "$ 32000" },
      { id: 11, amount: "$ 64000" },
      { id: 12, amount: "$ 125000" },
      { id: 13, amount: "$ 250000" },
      { id: 14, amount: "$ 500000" },
      { id: 15, amount: "$ 1000000" },
    ].reverse();
  }, []);

  useEffect(() => {
    questionNum > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNum - 1).amount);
    if (endOfQuestion) {
      setEarned(moneyPyramid.find((m) => m.id === questionNum).amount);
    }
  }, [questionNum, moneyPyramid, endOfQuestion]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">You earned {earned} </h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer
                  setStop={setStop}
                  questionNum={questionNum}
                  earned={earned}
                  endOfQuestion={endOfQuestion}
                />
              </div>
            </div>
            <div className="bottom">
              <Trivia
                data={data}
                setStop={setStop}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                endOfQuestion={endOfQuestion}
                setEndOfQuestion={setEndOfQuestion}
                earned={earned}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="money-list">
          {moneyPyramid.map((money) => {
            return (
              <li
                className={`money-list-item ${
                  questionNum === money.id && "active"
                }`}
                key={money.id}
              >
                <span className="money-list-num">{money.id}</span>
                <span className="money-list-amount">{money.amount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
