import axios from "axios";
import React, { useEffect, useState } from "react";

function Question() {
  const [Questions, setQuestions] = useState([]);
  const [showPopup, setshowPopup] = useState(false);
  const [payload, setPayload] = useState({});
  const AddQuestion = () => {
    axios
      .post("http://localhost:3001/", {
        action: "addQuestion",
        question: payload.question,
        answer: payload.answer,
        hint: payload.hint,
        points: payload.points,
        level: payload.level,
      })
      .then((ques) => {
        const questions = ques.data;
        console.log(questions);
        setQuestions(questions.questions);
      });
  };
  const setPayloadValue = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  }

  const renderFormattedText = (text) => {
    text = text.replace(/"([^"]+)"/g, "<b>$1</b>");
    text = text.replace(/!(.*?)!/g, "<code>$1</code>");
    text = text.replace(/\n/g, "<br>");
    return text;
  };

  const onAddClick = () => {
    setshowPopup(!showPopup);
  };

  const handleDeleteClick = (ques) => {
    axios
      .post("http://localhost:3001/", {
        action: "deleteQuestion",
        id: ques,
      })
      .then((ques) => {
        const questions = ques.data;
        console.log(questions);
        let question = Questions.filter((q) => q._id !== ques._id);
        setQuestions(question);
      });
  };
  useEffect(() => {
    axios
      .post("http://localhost:3001/", {
        action: "getQuestion",
      })
      .then((ques) => {
        const questions = ques.data;
        console.log(questions);
        setQuestions(questions.questions);
      });
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
                  <button
                    onClick={() => {
                      handleDeleteClick(question._id);
                    }}
                    className="border h-min py-1 px-2 mr-3 bg-white text-black   rounded-md"
                  >
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
              name="question"
              onChange={setPayloadValue}
              placeholder="Enter Question"
            ></textarea>
            <p className="px-2">Enter Answer</p>
            <textarea
              placeholder="Enter Hint"
              name="answer"
              onChange={setPayloadValue}
              className=" bg-gray-600  rounded-md p-1 px-3"
            />
            <p className="px-2">Enter Hint</p>
            <textarea
              type="text"
              name="hint"
              onChange={setPayloadValue}
              placeholder="Enter Hint"
              className=" bg-gray-600 rounded-md px-3 p-1"
            />
            <div className="flex items-center pt-1 justify-between">
              <div className="flex items-center ">
                <p className="px-2">Enter Points</p>
                <input
                  type="number"
                  name="points"
                  onChange={setPayloadValue}
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
                  name="level"
                  onChange={setPayloadValue}
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
                  name="mode"
                  onChange={setPayloadValue}
                  className=" bg-gray-600  rounded-md p-1 px-3"
                />
              </div>
            </div>
            <button onClick={AddQuestion} className="border h-min w-[10%]  mr-3 bg-white text-black  rounded-md">
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Question;
