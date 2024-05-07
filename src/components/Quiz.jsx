import React, { useState, useEffect } from "react";

import "./Quiz/Quiz.css"; // Assuming you have a Quiz.css file for styling

import { data } from "../data/data";

export const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(data[currentIndex]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  const checkAnswer = (e, answerIndex) => {
    if (!isLocked) {
      setSelectedAnswer(answerIndex);
      setIsLocked(true);

      if (answerIndex === currentQuestion.correctAnswer) {
        e.target.classList.add("correct");
      } else {
        e.target.classList.add("wrong");

        const correctOption = document.querySelector(
          `.option:nth-child(${currentQuestion.correctAnswer + 1})`
        );
        correctOption.classList.add("correct"); // Highlight correct option
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < data.length) {
      const options = document.querySelectorAll(".option");
      options.forEach((option) => {
        option.classList.remove("correct");
        option.classList.remove("wrong");
        setIsLocked(false); // Reset lock for next question
      });

      if (selectedAnswer === currentQuestion.correctAnswer) {
        // Only proceed if answer is correct
        if (currentIndex === data.length - 1 && selectedAnswer === 4) {
          // Set allCorrect to true if last question and answer 4 is correct
          setAllCorrect(true);
        } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setCurrentQuestion(data[currentIndex + 1]);
          setSelectedAnswer(null); // Reset selected answer
        }
      } else {
        console.log("Incorrect answer. Try again.");
      }
    } else {
      console.log("No more questions available");
    }
  };

  useEffect(() => {
    if (allCorrect) {
      setCurrentIndex(0);
      setCurrentQuestion(data[0]);
      setSelectedAnswer(null);
    }
  }, [allCorrect]);

  const resetQuiz = () => {
    setAllCorrect(false);
  };

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {allCorrect ? (
          <h2>
            You answered all 5 questions correctly! (You completed all 5 out of
            5 questions)
          </h2>
        ) : (
          <>
            <h2>{currentIndex + 1}. {currentQuestion.question}</h2>
            <ul>
              <li className="option"onClick={(e) => checkAnswer(e, 0)}>{currentQuestion.option1}</li>
              <li className="option"onClick={(e) => checkAnswer(e, 1)}>{currentQuestion.option2}</li>
              <li className="option"onClick={(e) => checkAnswer(e, 2)}>{currentQuestion.option3}</li>
              <li className="option"onClick={(e) => checkAnswer(e, 3)}>{currentQuestion.option4}</li>
            </ul>
            <button className="index" onClick={handleNextQuestion}>
              Next
            </button>
            <div className="question-count">
              {currentIndex + 1} of {data.length} questions
            </div>
          </>
        )}
        {allCorrect && ( // Only render reset button if allCorrect is true
          <button onClick={resetQuiz}>Reset Quiz</button>
        )}
      </div>
    </>
  );
};
