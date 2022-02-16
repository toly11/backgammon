import { UntilRange } from "./util";

export enum PlayerColor {
  "black" = 0,
  "white" = 1,
}

export enum PlayerHome {
  black = 25,
  white = 0,
}

export class Player {
  // todo move enums into this class.
  home: PlayerHome;

  constructor(public color: PlayerColor) {
    this.home = (color === PlayerColor.white)
      ? PlayerHome.white : PlayerHome.black;
  }
}


export class Checker {
  constructor(public color: PlayerColor) { }
}


export class Point {
  constructor(
    public position: PointNames,
    public checkers: Checker[] = []
  ) { }

  get oppisetPosition() {
    return 25 - this.position
  }
}

export interface BoardState {
  points: Point[];
  prison: Checker[];
  home: {
    white: Checker[];
    black: Checker[];
  };
}

export type PointNames = Exclude<UntilRange<25>, 0>
