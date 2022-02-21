import { Point } from "./Point";
import { Checker } from "./Checker";
import { DiceResult } from "./Dice";

export interface BoardState {
  points: Point[];
  prison: Point;
  home: {
    white: Checker[];
    black: Checker[];
  };
}

export interface SingleMove {
  from: Point;
  to: Point;
  uses: DiceResult;
}
export type MovePath = SingleMove[];
