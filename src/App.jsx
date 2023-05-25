import React, { useState } from 'react';
import './App.css'

const questions = [
    {
      id: 1,
      type: 1,
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green"],
    },
    {
      id: 2,
      type: 2,
      question: "Select your country:",
      options: ["India", "Canada", "UK"],
    },
    {
      id: 3,
      type: 3,
      question: "Select your hobbies:",
      options: ["Reading", "Music", "Sports"],
    },
    {
      id: 4,
      type: 4,
      question: "What is your name?",
    },
    {
      id: 5,
      type: 5,
      question: "Upload a file:",
    },
  ];
  

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handlePrevious = () => {
    setCurrentScreen(currentScreen - 1);
  };

  const handleSubmit = () => {
    setCurrentScreen(questions.length);
    // Perform any submission logic here
    console.log('Submitted Answers:', answers);
  };

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (ans) => ans.questionId === questionId
    );

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex].answer = answer;
    } else {
      updatedAnswers.push({ questionId, answer });
    }

    setAnswers(updatedAnswers);
  };

  const Questions = (question) => {
    switch (question.type) {
      case 1:
        return (
          <div className='container'>
            <div className='container-items'>
              <h3>{question.question}</h3>
              {question.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className='container'>
            <div className='container-items'>
              <h3>{question.question}</h3>
              <select
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              >
                <option value="">Select an option</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='container'>
            <div className='container-items'>
              <h3>{question.question}</h3>
              {question.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className='container'>
            <div className='container-items'>
              <h3>{question.question}</h3>
              <input
                type="text"
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className='container'>
            <div className='container-items'>
              <h3>{question.question}</h3>
              <input
                type="file"
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.files[0])
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const Submit = () => {
    if (currentScreen === 0) {
      return (
        <button onClick={handleNext}>Next</button>
      );
    } else if (currentScreen === questions.length - 1) {
      return (
        <div className='container'>
        <div className='container-items'>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        </div>
      );
    } else {
      return (
        <div className='container'>
        <div className='container-items'>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        </div>
      );
    }
  };

  return (
    <div>
      {currentScreen === questions.length ? (
        <div>
          <h2>Submitted Answers:</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                Question {answer.questionId}: {answer.answer.toString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='container'>
          <div className='container-items'>
            {Questions(questions[currentScreen])}
            {Submit()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
