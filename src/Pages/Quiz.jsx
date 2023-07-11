import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Components/Pagination";
import Question from "../Components/Question";
import { Navigate } from "react-router-dom";

const Quiz = () => {
  const questions = useSelector((store) => store.reducer.questions);
  const [page, setPage] = useState(0);

  if (questions.length == 0) {
    return <Navigate to={"/"} />;
  }

  function pageChange(target) {
    if (target == "Prev") {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  }

  // console.log(questions, "STORE");
  return (
    <Box padding={"5rem"}>
      <Question item={questions[page]} {...questions[page]} page={page} />

      <Pagination page={page} pageChange={pageChange} />
    </Box>
  );
};

export default Quiz;
