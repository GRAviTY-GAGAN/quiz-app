import {
  Box,
  Flex,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestionAndDetails } from "../Redux/action";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple

const Home = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("any");
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("any");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();
    const data = {
      name,
      category,
      amount,
      difficulty,
    };

    let paramObj = { amount, type: "multiple" };

    category !== "any" && (paramObj.category = category);
    difficulty !== "any" && (paramObj.difficulty = difficulty);

    setLoading(true);

    dispatch(updateQuestionAndDetails(data, setLoading, paramObj)).then(
      (res) => {
        // console.log(res);
        if (res == "SUCCESS") {
          navigate("/quiz");
        } else {
          toast({
            title: "Something went wrong!!",
            description: "Please Try Again.",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      }
    );
  }

  return (
    <div>
      <nav>
        <Box
          mt={8}
          fontSize={"large"}
          fontWeight={500}
          display={"flex"}
          justifyContent={"center"}
        >
          <Link to={"/dashboard"}>Dashboard</Link>
        </Box>
      </nav>
      <Flex mt={8} justify={"center"} align={"center"}>
        <Heading fontWeight={400}>Set up your quiz</Heading>
      </Flex>
      <Box w={"50%"} maxW={"500px"} minW={"330px"} margin={"auto"} mt={8}>
        <form onSubmit={handleForm}>
          <Flex direction={"column"} gap={"1.5rem"}>
            <Input
              onChange={(e) => setName(e.target.value)}
              isRequired
              placeholder="Enter Your Name"
            />
            <Select onChange={(e) => setCategory(e.target.value)}>
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">
                Entertainment: Japanese Anime &amp; Manga
              </option>
              <option value="32">
                Entertainment: Cartoon &amp; Animations
              </option>
            </Select>
            <Select
              onChange={(e) => setDifficulty(e.target.value)}
              name="trivia_difficulty"
            >
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
            <NumberInput
              onChange={(e) => setAmount(e.target.value)}
              isRequired
              defaultValue={10}
              min={5}
              max={50}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!loading ? (
              <Input
                bg={"red.500"}
                color={"white"}
                type="submit"
                value={"START QUIZ"}
              />
            ) : (
              <Box
                bg={"red.500"}
                borderRadius={"5px"}
                color={"white"}
                textAlign={"center"}
                p={"0.5rem"}
                pt={"0.8rem"}
              >
                <Spinner />
              </Box>
            )}
          </Flex>
        </form>
      </Box>
    </div>
  );
};

export default Home;
