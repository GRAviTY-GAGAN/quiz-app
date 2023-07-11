import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, pageChange }) => {
  const limit = useSelector((store) => store.reducer.questionsCount);
  const navigate = useNavigate();

  function handlePageChange(e) {
    pageChange(e.target.innerText);
  }

  function handleSubmit() {
    navigate("/results");
  }

  return (
    <Flex justify={"space-between"} align={"center"}>
      {page != limit - 1 ? (
        <>
          <Button onClick={handlePageChange} isDisabled={page == 0}>
            Prev
          </Button>
          <Button onClick={handlePageChange} isDisabled={page == limit}>
            Next
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handlePageChange} isDisabled={page == 0}>
            Prev
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      )}
    </Flex>
  );
};

export default Pagination;
