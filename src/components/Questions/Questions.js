import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import QuestionItem from "./QuestionItem";
// import QuestionItemAnswer from "./QuestionItemAnswer";
import { APIBaseUrl, APIusername, APIpassword } from "../../config";

const queItems = {
  _items: [
    /*{
      _id: "61ba7ca4332469359d0f95d8",
      question: {
        description: "$$x^2$$1111",
      },
      answers: [
        {
          description: "2x11",
        },
      ],
      tags: ["math.calculus.derivatives"],
      _updated: "Wed, 15 Dec 2021 23:39:16 GMT",
      _created: "Wed, 15 Dec 2021 23:39:16 GMT",
      _links: {
        self: {
          title: "Quizitem",
          href: "/v1/quizitems/61ba7ca4332469359d0f95d8",
        },
      },
    },
    {
      _id: "61ba7ca4332469359d0f95d8",
      question: {
        description: "$$x^2$$2222",
      },
      answers: [
        {
          description: "2x121212",
        },
      ],
      tags: ["math.calculus.derivatives"],
      _updated: "Wed, 15 Dec 2021 23:39:16 GMT",
      _created: "Wed, 15 Dec 2021 23:39:16 GMT",
      _links: {
        self: {
          title: "Quizitem",
          href: "/v1/quizitems/61ba7ca4332469359d0f95d8",
        },
      },
    },*/
  ],
  /*_links: {
    parent: {
      title: "home",
      href: "/",
    },
    self: {
      title: "/v1/quizitems",
      href: "v1/quizitems",
    },
  },
  _meta: {
    page: 1,
    max_results: 1000,
    total: 1,
  },*/
};

function Questions(props) {
  const navigate = useNavigate();


  let { tag } = useParams();
  const [questions, setQuestions] = useState(queItems?._items);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [noMoreQuestion, setnoMoreQuestion] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToNextQuestion = () => {
    setShowAnswer(false);
    let newIndex = currentQuestion + 1;
    if (newIndex == questions?.length - 1) {
      setCurrentQuestion(newIndex);
      setnoMoreQuestion(true);
    } else if (newIndex < questions?.length) {
      setCurrentQuestion(newIndex);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      let apiurl = APIBaseUrl + "api/v1/quizitems";
      if(tag && tag !== '' && tag !== 'undefined'){
        apiurl = apiurl + `?where={"tags":{"$in":["${tag}"]}}`;
        // /api/v1/quizitems?where={"tags":{"$in":["math.calculus.limits"]}}'
      }
      fetch(apiurl, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          // 'Authorization': 'Basic ' + btoa(`${APIusername}:${APIpassword}`),
          // 'content-type':' application/json',
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          setLoading(false);
          if(response?._items?.length > 0){
            // using Array map and Math.random
            let QuestionsItems = response?._items;
            const shuffledArr = QuestionsItems.map(a => ({ sort: Math.random(), value: a })).sort((a, b) => a.sort - b.sort).map(a => a.value);
            setQuestions(shuffledArr);
          } else {
            navigate("/nomorequestion");
          }
        });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);
  return (
    <div className="box border-2 p-3 text-center max-w-sm mt-2 mx-auto">
      {loading === true ? (
        "Loading..."
      ) : (
        <form className="max-w-screen-md mx-auto">
          {questions[currentQuestion] && (
            // <>
            //   {showAnswer ? (
            //     <QuestionItemAnswer
            //       key={0}
            //       question={questions[currentQuestion].question?.description}
            //       answers={questions[currentQuestion].answers[0].description}
            //     />
            //   ) : (
            <QuestionItem
              key={0}
              question={questions[currentQuestion].question?.description}
              answer={questions[currentQuestion].answers[0].description}
              answers={questions[currentQuestion].answers[0]}
              showAnswer={showAnswer}
            />
            //   )}
            // </>
          )}

          <div className="flex items-center justify-center">
            {!showAnswer && (
              <button
                type="button"
                onClick={() => setShowAnswer(!showAnswer)}
                className="inline-flex items-center px-6 py-2 text-sm bg-green-500 text-white rounded-lg shadow outline-none gap-x-1 hover:bg-green-600"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /> 
              </svg> */}
                Answer
              </button>
            )}

            {noMoreQuestion === true ? (
              <Link
                to={"/nomorequestion"}
                className="px-6 py-2 text-sm text-white bg-indigo-500 rounded-lg outline-none hover:bg-indigo-600 ring-indigo-300 "
              >
                Next
              </Link>
            ) : (
              <button
                onClick={() => {
                  goToNextQuestion();
                }}
                className="px-6 py-2 text-sm text-white bg-indigo-500 rounded-lg outline-none hover:bg-indigo-600 ring-indigo-300 "
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default Questions;
