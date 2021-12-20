import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import NoMoreQuestions from "./components/NoMoreQuestions/NoMoreQuestions";
import NotFound from "./components/NotFound/NotFound";
import Questions from "./components/Questions/Questions";
import Thankyou from "./components/Thankyou/Thankyou";

function App() {
  return (
    <Router>
      <div className="antialiased sans-serif bg-gray-200 h-full">
        <div className="container mx-auto flex justify-between px-5 py-4">
          <div className="logo">My Quiz</div>
          <ul className="flex menulist">
            <li className="mr-6">
              <Link to={"/"} className="text-blue-500 hover:text-blue-800">
                Home
              </Link>
            </li>
            {/* <li class="mr-6">
              <Link
                to={"/questions"}
                className="text-blue-500 hover:text-blue-800"
              >
                Questions
              </Link>
            </li> */}
          </ul>
        </div>
        <hr />
        <div className="px-5 py-4 container mx-auto ">
          <div className=" bg-white text-gray-600 py-2">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="questions/:tag" element={<Questions />} />
              <Route path="questions/" element={<Questions />} />
              <Route path="thankyou" element={<Thankyou />} />
              <Route path="nomorequestion" element={<NoMoreQuestions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
