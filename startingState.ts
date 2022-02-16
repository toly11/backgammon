import { Checker, PlayerColor } from "./class";

interface Point {
  position: PointNames;
  checkers: Checker[];
}

interface BoardState {
  points: Point[];
  prison: Checker[];
  home: {
    white: Checker[];
    black: Checker[];
  };
}
export const initialState: BoardState = {
  points: [
    {
      position: 1,
      checkers: [
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
      ],
    },
    {
      position: 2,
      checkers: [],
    },
    {
      position: 3,
      checkers: [],
    },
    {
      position: 4,
      checkers: [],
    },
    {
      position: 5,
      checkers: [],
    },
    {
      position: 6,
      checkers: [
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
      ],
    },
    {
      position: 7,
      checkers: [],
    },
    {
      position: 8,
      checkers: [
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
      ],
    },
    {
      position: 9,
      checkers: [],
    },
    {
      position: 10,
      checkers: [],
    },
    {
      position: 11,
      checkers: [],
    },
    {
      position: 12,
      checkers: [
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
      ],
    },
    {
      position: 13,
      checkers: [
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
      ],
    },
    {
      position: 14,
      checkers: [],
    },
    {
      position: 15,
      checkers: [],
    },
    {
      position: 16,
      checkers: [],
    },
    {
      position: 17,
      checkers: [
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
      ],
    },
    {
      position: 18,
      checkers: [],
    },
    {
      position: 19,
      checkers: [
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
        new Checker(PlayerColor.black),
      ],
    },
    {
      position: 20,
      checkers: [],
    },
    {
      position: 21,
      checkers: [],
    },
    {
      position: 22,
      checkers: [],
    },
    {
      position: 23,
      checkers: [],
    },
    {
      position: 24,
      checkers: [
        new Checker(PlayerColor.white),
        new Checker(PlayerColor.white),
      ],
    },
  ],
  prison: [],
  home: {
    white: [],
    black: [],
  },
};

type PointNames =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
