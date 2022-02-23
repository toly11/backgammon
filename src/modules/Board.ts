import { Point } from "./Point";
import { SingleDice } from "./Dice";

export interface SingleMove {
  from: Point;
  to: Point;
  uses: SingleDice;
}
export type MovePath = SingleMove[];
