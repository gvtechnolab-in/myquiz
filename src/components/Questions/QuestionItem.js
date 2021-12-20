import React from "react";
import MarkDownString from "../MarkdownString/MarkDownString";

function QuestionItem({ key, question, answer, answers, showAnswer }) {
  return (
    <>
      {/* <h2>Question</h2> */}
      <div key={key} className="flex flex-col mb-4">
        <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
          <strong className="mr-2 ">Q: </strong>{" "}
          <div><MarkDownString string={question} /></div>
        </label>
        {showAnswer === true && (
          <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
            <strong className="mr-2 ">A: </strong>{" "}
            <div><MarkDownString string={answer} /></div>
          </label>
        )}
        {/*{answers?.map((answerItem, index) => {
        return (
          <label key={"ans" + index}>
            <input
              type="radio"
              name={"question" + key}
              id={answerItem}
              class="hidden"
            />
            <div class="label-checked:bg-red-600 label-checked:text-white">
              {answerItem}
            </div>
          </label>
        );
      })}*/}
      </div>
    </>
  );
}

export default QuestionItem;
