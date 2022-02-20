import { Point } from "./Point";
import { Checker } from "./Checker";
import { DiceResut } from "./Dice";

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
  uses: DiceResut;
}
export type MovePath = SingleMove[];
