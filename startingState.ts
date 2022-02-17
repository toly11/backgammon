import { BoardState, Checker, PlayerColor, Point } from "./class";

export const initialState: BoardState = {
  // todo make prison as a Point instance, so it can be calced in getSingleMoveForChecker
  
  points: [
    new Point(1, [
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
    ]),
    new Point(2),
    new Point(3),
    new Point(4),
    new Point(5),
    new Point(6, [
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
    ]),
    new Point(7),
    new Point(8, [
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
    ]),
    new Point(9),
    new Point(10),
    new Point(11),
    new Point(12, [
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
    ]),
    new Point(13, [
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
    ]),
    new Point(14),
    new Point(15),
    new Point(16),
    new Point(17, [
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
    ]),
    new Point(18),
    new Point(19, [
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
      new Checker(PlayerColor.black),
    ]),
    new Point(20),
    new Point(21),
    new Point(22),
    new Point(23),
    new Point(24, [
      new Checker(PlayerColor.white),
      new Checker(PlayerColor.white),
    ]),
  ],
  prison: new Point(25),
  home: {
    white: [],
    black: []
  }
}