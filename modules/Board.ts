import { Point } from "./Point";
import { Checker } from "./Checker";


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
