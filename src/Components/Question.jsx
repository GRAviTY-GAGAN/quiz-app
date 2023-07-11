import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import "./Question.css";
import { useDispatch, useSelector } from "react-redux";
import { CORRECT_ANSWER, WRONG_ANSWER } from "../Redux/actionType";

const Question = ({
  page,
  correct_answer,
  incorrect_answers,
  question,
  item,
}) => {
  // const options = [...incorrect_answers, correct_answer];
  const options = item.choices;

  const questionsFromStore = useSelector((store) => store.reducer.questions);

  let currentQuestion = "";

  questionsFromStore.forEach((ele) => {
    if (ele.question == item.question) {
      currentQuestion = ele;
    }
  });

  const [indexName, setIndexName] = useState("");
  const [correct, setCorrect] = useState("");

  const dispatch = useDispatch();

  function handleAnswer(e) {
    setIndexName(e.target.innerText);
    if (e.target.innerText == correct_answer) {
      setCorrect(true);
      dispatch({
        type: CORRECT_ANSWER,
        payload: {
          answered: "correct",
          answerGiven: correct_answer,
          question: item.question,
        },
      });
    } else {
      setCorrect(false);
      dispatch({
        type: WRONG_ANSWER,
        payload: {
          answered: "wrong",
          answerGiven: e.target.innerText,
          question: item.question,
        },
      });
    }
  }

  // console.log(
  //   currentQuestion.answerGiven == indexName &&
  //     currentQuestion.answered == "correct"
  //     ? "rightAns"
  //     : currentQuestion.answerGiven == indexName &&
  //       currentQuestion.answered == "wrong"
  //     ? "wrongAns"
  //     : correct == true && item == indexName
  //     ? "rightAns"
  //     : correct == false && item == indexName
  //     ? "wrongAns"
  //     : ""
  // );

  // console.log(currentQuestion);

  return (
    <Box mb={8}>
      <Box>
        {page + 1}. {currentQuestion.question || question}
      </Box>
      <Box width={"500px"}>
        {options.map((option, index) => {
          return (
            <Box
              key={index}
              cursor={"pointer"}
              className={
                currentQuestion.answerGiven == option &&
                currentQuestion.answered == "correct"
                  ? "rightAns"
                  : currentQuestion.answerGiven == option &&
                    currentQuestion.answered == "wrong"
                  ? "wrongAns"
                  : correct == true && item == indexName
                  ? "rightAns"
                  : correct == false && item == indexName
                  ? "wrongAns"
                  : ""
              }
              name={option}
              border={"1px solid gray"}
              p={"0.5rem"}
              m={"0.5rem 0"}
              onClick={!item?.answered ? handleAnswer : null}
            >
              {option}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Question;

// className={
//     item.answerGiven == item && item.answered == "correct"
//       ? "rightAns"
//       : item.answerGiven == item && item.answered == "wrong"
//       ? "wrongAns"
//       : correct == true && item == indexName
//       ? "rightAns"
//       : correct == false && item == indexName
//       ? "wrongAns"
//       : ""
//   }
