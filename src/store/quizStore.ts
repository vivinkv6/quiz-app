import { create } from "zustand";

type State = {
  question: number;
  score: string;
  point: number;
  correct: number;
  wrong: number;
};

type Action = {
  nextQuestion: () => void;
  addpoint: (point: number) => void;
  subpoint: (point: number) => void;
  totalScore: () => void;
  addCorrect: () => void;
  addWrong: () => void;
};

export const useQuizStore = create<State & Action>((set) => ({
  question: 1,
  score: "",
  point: 0,
  correct: 0,
  wrong: 0,
  nextQuestion: () => {
    set((state) => ({
      question: state.question + 1,
    }));
  },
  addpoint: (point) => {
    set((state) => ({
      point: state.point + point,
    }));
  },
  subpoint: (point) => {
    set((state) => ({
      point: state.point < point ? 0 : state.point-point,
    }));

  },
  totalScore: () => {
    set((state) => ({
      score: `${state.correct} / ${state.question}`,
    }));
  },
  addCorrect: () => {
    set((state) => ({
      correct: state.correct + 1,
    }));
  },
  addWrong: () => {
    set((state) => ({
      wrong: state.wrong + 1,
    }));
  },
}));
