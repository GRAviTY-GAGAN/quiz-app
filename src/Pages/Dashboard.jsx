import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/dashboard.css";

// let jsonURL = `http://localhost:8080/results`;

let jsonURL = `https://masai-quiz-ho3k.onrender.com/results`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`${jsonURL}`)
      .then((res) => {
        // console.log(res);
        setData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <Heading fontSize={"300px"} color={"blue.500"} textAlign={"center"}>
        <Spinner fontSize={"40px"} />
      </Heading>
    );
  }

  return (
    <Box padding={"0.5rem"}>
      <Flex justify={"center"} align={"center"}>
        <Box fontSize={"large"} fontWeight={500}>
          <Link to={"/"}>Home</Link>
        </Box>
      </Flex>
      <Heading marginLeft={"5px"} fontWeight={500}>
        Dashboard
      </Heading>
      <Box>
        <Box className="dashboard__cardsCont">
          {data.map((item) => {
            return (
              <Box key={item.id} border={"1px solid black"} m={2}>
                <Box>Name: {item.name}</Box>
                <Box>Answers correct: {item.correctAnswersCount}</Box>
                <Box>Answers wrong: {item.wrongAnswerCount}</Box>
                <Box>
                  TotalScore : {item.totalScore}/{item.totalQuestion}
                </Box>
                <Box>Percent: {item.percent}%</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
