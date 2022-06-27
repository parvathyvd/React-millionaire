import React, { useEffect, useState } from "react";

const Trivia = ({
  data,
  setStop,
  questionNum,
  setQuestionNum,
  earned,
  setEndOfQuestion,
  endOfQuestion,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  useEffect(() => {
    if (questionNum > 5) {
      setEndOfQuestion(true);
    }
    setQuestion(data[questionNum - 1]);
  }, [data, questionNum, setEndOfQuestion]);
  const delay = (duration, cb) => {
    setTimeout(() => {
      cb();
    }, duration);
  };
  const onClickHandler = (ans) => {
    console.log(ans);
    setSelectAnswer(ans);
    setClassName("answer active");
    delay(2000, () => {
      setClassName(ans.correct ? "answer correct" : "answer wrong");
    });

    delay(6000, () => {
      if (ans.correct) {
        setQuestionNum((prev) => prev + 1);
        setSelectAnswer(null);
      } else {
        setStop(true);
      }
    });
  };

  return (
    <div className="trivia">
      {endOfQuestion ? (
        <p className="endQuestion">
          You can add more question to play more. Right now it's ended. You have
          earned {earned}
        </p>
      ) : (
        <>
          <div className="question">{question?.question}</div>
          <div className="answers">
            {question?.answers.map((ans, index) => {
              return (
                <div
                  className={selectAnswer === ans ? className : "answer"}
                  key={index}
                  onClick={() => onClickHandler(ans)}
                >
                  {ans.text}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Trivia;
