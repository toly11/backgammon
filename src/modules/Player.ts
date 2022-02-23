import { Point } from "./Point";

export enum PlayerColor {
  "black" = "black",
  "white" = "white"
}

export enum PlayerHome {
  black = 25,
  white = 0
}

export enum PlayerPrison {
  white = 25,
  black = 0
}

export class Player {
  // todo move enums into this class.
  home: Point;
  prison: Point;
  color: PlayerColor;

  constructor(color: PlayerColor) {
    this.home = new Point(PlayerHome[color]);
    this.prison = new Point(PlayerPrison[color]);
    this.color = color;
  }
}

export class Players {
  private _current: Player;

  // todo use inffer on starter, to make sure is's one of the first 2 args
  constructor(private white: Player, private black: Player, starter: Player) {
    this._current = starter;
  }

  get current() {
    return this._current;
  }

  toggle(): Player {
    if (this.current === this.white) {
      this._current = this.black;
    } else {
      this._current = this.white;
    }

    return this.current;
  }
}
