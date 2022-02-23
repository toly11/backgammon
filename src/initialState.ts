import { Checker } from "./modules/Checker";
import { PlayerColor } from "./modules/Player";
import { Point } from "./modules/Point";

export const initialPointsState: Point[] = [
  new Point(1, repeatCheckers(2, PlayerColor.black)),
  new Point(2),
  new Point(3),
  new Point(4),
  new Point(5),
  new Point(6, repeatCheckers(5, PlayerColor.white)),
  new Point(7),
  new Point(8, repeatCheckers(3, PlayerColor.white)),
  new Point(9),
  new Point(10),
  new Point(11),
  new Point(12, repeatCheckers(5, PlayerColor.black)),
  new Point(13, repeatCheckers(5, PlayerColor.white)),
  new Point(14),
  new Point(15),
  new Point(16),
  new Point(17, repeatCheckers(3, PlayerColor.black)),
  new Point(18),
  new Point(19, repeatCheckers(5, PlayerColor.black)),
  new Point(20),
  new Point(21),
  new Point(22),
  new Point(23),
  new Point(24, repeatCheckers(2, PlayerColor.white))
];

function repeatCheckers(count: number, color: PlayerColor): Checker[] {
  let list: Checker[] = [];
  for (let i = 0; i < count; i++) {
    list.push(new Checker(PlayerColor[color]));
  }
  return list;
}
