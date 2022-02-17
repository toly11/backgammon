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

  // ! not in use
  get oppisetPosition() {
    return 25 - this.position
  }

  relativePositionFromHome(player: Player) {
    if (this.position === 25) // is prison
      return this.position;

    if (player.color === PlayerColor.white) {
      return this.position
    } else {
      return player.home - this.position
    }
  }

  isHouse() {
    return this.checkers.length > 1
  }

  isSingle() {
    return this.checkers.length === 1
  }

  // todo rename includesCheckersOf
  includesCheckerOf(player: Player) {
    if (!this.checkers.length) {
      return false;
    }

    return !!this.checkers.find(c => c.color === player.color)
  }
}

export interface BoardState {
  points: Point[];
  prison: Point;
  home: {
    white: Checker[];
    black: Checker[];
  };
}

export type PointNames = Exclude<UntilRange<25>, 0> | 25


export interface Moves {
  from: Point
  toCombinations: Point[][]
}

export type DiceResut = number;

export class Dice {
  static roll1Dice(): DiceResut {
    return Math.floor(Math.random() * 6 + 1);
  }

  static roll2Dices(): DiceResut[] {
    const dices = [this.roll1Dice(), this.roll1Dice()];

    if (this.dicesAreDouble(dices)) {
      dices.push(...dices);
    }

    return dices;
  }

  static dicesAreDouble(dices: DiceResut[]): boolean {
    return dices[0] === dices[1];
  }
}