import { Point } from "./Point";
import { Checker } from "./Checker";
import { DiceObject } from "./Dice";


export interface BoardState {
  points: Point[];
  prison: Point;
  home: {
    white: Checker[];
    black: Checker[];
  };
}

export interface Moves {
  from: Point;
  toCombinations: Point[][];
}

export interface Move {
  from: Point
  path: Point[]
  usesDices: DiceObject["id"][]
}
