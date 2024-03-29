import React, { useEffect, useState } from "react";

function Question() {
 
  const questions = [
    {
      question: "Who Created Python Programming Language ?",
      answer: "Guido van Rossum",
      hint: "Guido van Rossum",
      points: 10,
      level: 1,
    },
  ];
  const [Questions, setQuestions] = useState([questions]);
 useEffect(() => {  
    setQuestions(questions);
 }, []);
  return (
    <div className="w-full h-full rounded-xl  text-white bg-gray-700 m-3">
      <h1 className="flex text-center text-xl font-semibold p-6">
        Manage Question
      </h1>
      <div className="flex bg-gray-600 m-2 rounded-lg flex-col gap-3 p-4">
        {Questions.map((question, index) => {
          <div
            key={index}
            className="flex flex-col bg-gray-700 p-4 rounded-lg gap-3"
          >
            <h1 className="text-xl font-semibold">
              {question.question}
            </h1>
            <h1 className="text-white text-lg font-semibold">
              Answer: {question.answer}
            </h1>
            <h1 className="text-white text-lg font-semibold">
              Hint: {question.hint}
            </h1>
            <h1 className="text-white text-lg font-semibold">
              Points: {question.points}
            </h1>
            <h1 className="text-white text-lg font-semibold">
              Level: {question.level}
            </h1>
          </div>;
        })}
      </div>
    </div>
  );
}

export default Question;
