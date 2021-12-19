import React from "react";
import MarkDownString from "../MarkdownString/MarkDownString";
// import { MathComponent } from 'mathjax-react';
function QuestionItemAnswer({ key, question, answers }) {
  return (
    <div key={key} className="flex flex-col mb-4">
      <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
        <MarkDownString string={question} />
      </label>
      <label for="name" className="inline-flex mb-2 text-sm text-gray-800">
        <MarkDownString string={answers} />
      </label>
    </div>
  );
}

export default QuestionItemAnswer;
