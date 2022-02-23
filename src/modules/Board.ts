import { Point } from "./Point";
import { DiceResult } from "./Dice";

export interface SingleMove {
  from: Point;
  to: Point;
  uses: DiceResult;
}
export type MovePath = SingleMove[];
