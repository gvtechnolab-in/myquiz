import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function MarkDownString({ string }) {
  return (
    <>
      <ReactMarkdown
        children={string}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
      {/* <ReactMarkdown
          children={`The lift coefficient ($C_L$) is a dimensionless coefficient.`}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        /> */}
    </>
  );
}

export default MarkDownString;
