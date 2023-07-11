import { CORRECT_ANSWER, UPDATE_QUESTIONS, WRONG_ANSWER } from "./actionType";

const initialState = {
  userName: "",
  category: "any",
  difficulty: "any",
  questionsCount: 10,
  correct: 0,
  wrong: 0,
  questions: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_QUESTIONS: {
      return {
        ...state,
        userName: payload.data.name,
        category: payload.data.category,
        difficulty: payload.data.difficulty,
        questionsCount: payload.data.amount,
        questions: payload.questions,
      };
    }

    case CORRECT_ANSWER: {
      let updatedQuestions = [...state.questions];

      updatedQuestions = updatedQuestions.map((item) => {
        if (item.question == payload.question) {
          item.answerGiven = payload.answerGiven;
          item.answered = "correct";
          return item;
        }
        return item;
      });

      return { ...state, questions: updatedQuestions };
    }

    case WRONG_ANSWER: {
      let updatedQuestions = [...state.questions];

      updatedQuestions = updatedQuestions.map((item) => {
        if (item.question == payload.question) {
          item.answered = "wrong";
          item.answerGiven = payload.answerGiven;
          return item;
        }
        return item;
      });

      return { ...state, questions: updatedQuestions };
    }

    default: {
      return state;
    }
  }
}
