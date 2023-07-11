import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { color } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

// let jsonURL = `http://localhost:8080/results`;

let jsonURL = `https://masai-quiz-ho3k.onrender.com/results`;

const Result = () => {
  const questions = useSelector((store) => store.reducer.questions);
  const storeData = useSelector((store) => store.reducer);
  //   const dispatch = useDispatch();

  //   const [correct, setCorrect] = useState(0);
  //   const [wrong, setWrong] = useState(0);

  if (questions.length == 0) {
    return <Navigate to={"/"} />;
  }

  let correct = 0;
  let wrong = 0;

  questions.forEach((el) => {
    if (el.answered == "correct") {
      //   setCorrect(correct + 1);
      correct++;
    } else if (el.answered == "wrong") {
      //   setWrong(wrong + 1);
      wrong++;
    }
  });

  //   console.log(storeData);

  //   useEffect(() => {
  // dispatch();
  updateJsonServer();
  //   }, []);

  function updateJsonServer(params) {
    axios
      .post(`${jsonURL}`, {
        name: storeData.userName,
        correctAnswersCount: correct,
        wrongAnswerCount: wrong,
        totalScore: correct,
        totalQuestion: questions.length,
        percent: (correct / questions.length) * 100,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box width={"50%"} m={"auto"} mt={8}>
      <Flex justify={"center"} mb={12}>
        <Heading>
          <Link to={"/"}>Home</Link>
        </Heading>
      </Flex>
      <Flex mb={12} justify={"center"} align={"center"}>
        <Heading fontWeight={400}>Result</Heading>
      </Flex>
      <Box>
        Correct answers count :{" "}
        <span style={{ color: "green" }}>{correct}</span>
      </Box>
      <Box>
        Incorrect answers count :{" "}
        <span style={{ color: "green" }}>{wrong}</span>
      </Box>
      <Box>
        Total score :{" "}
        <span style={{ color: "green" }}>
          {correct}/{questions.length}
        </span>
      </Box>
      <Box>
        Percentage :{" "}
        <span style={{ color: "green" }}>
          {(correct / questions.length) * 100}%
        </span>
      </Box>
    </Box>
  );
};

export default Result;
