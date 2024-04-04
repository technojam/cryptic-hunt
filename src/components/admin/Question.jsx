import React, { useEffect, useState } from "react";

function Question() {
  const [Questions, setQuestions] = useState([]);
  const [showPopup, setshowPopup] = useState(false);

  const renderFormattedText = (text) => {
    text = text.replace(/"([^"]+)"/g, "<b>$1</b>");
    text = text.replace(/!(.*?)!/g, "<code>$1</code>");
    text = text.replace(/\n/g, "<br>");
    return text;
  };

  const onAddClick = () => {
    setshowPopup(!showPopup);
  };

  const questions = [
    {
      question: `Problem Statement:
      The renowned art collector, Ms. Steal Your Art, has vanished along with her prized possession, the "Mona Lisa Smile." You, a cunning detective with a knack for puzzles, are tasked with deciphering her cryptic message to locate the stolen masterpiece.
      Input: A string message containing seemingly nonsensical words and numbers:
      message = !davinci_1452-missing-500_coordinates(3, 11)!
      Constraints:
      The format of message might vary slightly but will always include keywords related to the artist/artwork and coordinates in parentheses.
      Output: Return a single string representing the location where Ms. Steal Your Art has hidden the "Mona Lisa Smile."
      Explanation:
      This challenge requires a keen eye for detail and some basic knowledge of art history to crack Ms. Steal Your Art's code.
      Step 1: Identify the Reference
      The message mentions "davinci" and "Mona Lisa Smile," indicating a connection to a famous artist and artwork.
      Step 2: Analyze the Keywords
      "davinci" likely refers to Leonardo da Vinci, the painter of the Mona Lisa.
      "1452-missing-500" might be dates or a calculation.
      Step 3: Understand the Coordinates
      The message includes coordinates in parentheses: (3, 11). These could represent a location on a map or grid system.
      Step 4: Combining the Clues (Medium Difficulty)
      Leonardo da Vinci is most associated with Italy, where the Mona Lisa is usually displayed.
      Focus on the numbers and their relation to each other.
      Consider how the coordinates could be used within a museum or gallery setting.
      Unique Solution:
      This challenge has a unique solution that relies on basic math and knowledge of famous artwork placement. 
      `,
      answer: "Guido van Rossum",
      hint: "Guido van Rossum",
      points: 10,
      level: 1,
    },
    {
      question: "Who Created Python Programming Language ?",
      answer: "Guido van Rossum",
      hint: "Guido van Rossum",
      points: 10,
      level: 1,
    },
    {
      question: "Who Created Python Programming Language ?",
      answer: "Guido van Rossum",
      hint: "Guido van Rossum",
      points: 10,
      level: 1,
    },
    {
      question: "Who Created Python Programming Language ?",
      answer: "Guido van Rossum",
      hint: "Guido van Rossum",
      points: 10,
      level: 1,
    },
  ];

  useEffect(() => {
    setQuestions(questions);
  }, []);
  return (
    <>
      <div className="w-full scrollbar h-full rounded-xl  text-white bg-gray-700 m-3">
        <div className="flex items-center justify-between">
          <h1 className="flex text-center text-xl font-semibold p-6">
            Manage Question
          </h1>
          <button
            onClick={onAddClick}
            className="border h-min py-1 px-2 mr-3 bg-white text-black  rounded-md"
          >
            Add New
          </button>
        </div>
        <div className="flex rounded-lg overflow-auto h-[85%] flex-col gap-3 p-4 overscroll-padding">
          {Questions.map((question, index) => {
            return (
              <div
                key={index}
                className="flex flex-col  bg-gray-600 p-3  rounded-lg gap-3"
              >
                <br />
                <h1
                  className="text-xl font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: renderFormattedText(question.question),
                  }}
                ></h1>
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
                <div>
                  <button className="border h-min py-1 px-2 mr-3 bg-white text-black  rounded-md">
                    Edit
                  </button>
                  <button className="border h-min py-1 px-2 mr-3 bg-white text-black  rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showPopup && (
        <div className="w-[80%] left-32  bg-gray-700 shadow-2xl shadow-black rounded-lg h-[80%] absolute">
          <div className="flex justify-between items-center text-white p-5">
            <div>Add New Question</div>
            <button
              onClick={onAddClick}
              className="rounded-full w-7 bg-red-400 h-7"
            >
              X
            </button>
          </div>
          <div className="p-2 text-white h-[500px] gap-2 flex flex-col">
            <p className="px-2">Enter Question</p>
            <textarea
              className="p-1 px-3 h-[50%] rounded-md bg-gray-600 "
              placeholder="Enter Question"
            ></textarea>
            <p className="px-2">Enter Answer</p>
            <textarea
              placeholder="Enter Hint"
              className=" bg-gray-600  rounded-md p-1 px-3"
            />
            <p className="px-2">Enter Hint</p>
            <textarea
              type="text"
              placeholder="Enter Hint"
              className=" bg-gray-600 rounded-md px-3 p-1"
            />
            <div className="flex items-center pt-1 justify-between">
              <div className="flex items-center ">
                <p className="px-2">Enter Points</p>
                <input
                  type="number"
                  min={1}
                  placeholder="Enter Points"
                  className=" bg-gray-600 rounded-md p-1 px-3"
                />
              </div>
              <div className="flex items-center ">
                <p className="px-2">Enter Level</p>
                <input
                  type="number"
                  min={1}
                  placeholder="Enter Level"
                  className=" bg-gray-600  rounded-md p-1 px-3"
                />
              </div>
              <div className="flex items-center ">
                <p className="px-2">Enter Mode</p>
                <input
                  type="number"
                  min={1}
                  placeholder="Enter Mode"
                  className=" bg-gray-600  rounded-md p-1 px-3"
                />
              </div>
            </div>
            <button className="border h-min w-[10%]  mr-3 bg-white text-black  rounded-md">
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Question;
