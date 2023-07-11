import axios from "axios";
import { UPDATE_QUESTIONS } from "./actionType";

let url = `https://opentdb.com/api.php`;

export const updateQuestionAndDetails =
  (data, setLoading, paramObj) => (dispatch) => {
    return axios
      .get(`${url}`, { params: paramObj })
      .then((res) => {
        // console.log(res);
        // shuffleAnswers(res.data.results);
        if (res.status == 200) {
          dispatch({
            type: UPDATE_QUESTIONS,
            payload: {
              data,
              // questions: res.data.results,
              questions: shuffleAnswers(res.data.results),
            },
          });
          return "SUCCESS";
        } else {
          return "FAILURE";
        }
      })
      .catch((err) => {
        console.log(err);
        return "FAILURE";
      })
      .finally(() => {
        setLoading(false);
      });
  };

function shuffleAnswers(data) {
  let newData = data.map((item) => {
    let options = [...item.incorrect_answers, item.correct_answer];
    item.choices = randomOptions(options);
    return item;
  });
  return newData;
}

function randomGen() {
  return Math.floor(Math.random() * 4);
}

function randomOptions(options) {
  let arr = new Array(4).fill("i");
  let i = 0;
  let track = [];

  function fun(num) {
    let randomNum = randomGen();
    // log(num,arr,randomNum)
    if (num >= 4) {
      return arr;
    }
    if (!track.includes(randomNum)) {
      track.push(randomNum);
      arr[num] = options[randomNum];
      num++;
      return fun(num);
    } else {
      return fun(num);
    }
  }

  return fun(0);
}
