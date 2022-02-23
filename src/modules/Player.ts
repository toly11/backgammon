import { Point } from "./Point";

export enum PlayerColor {
  "black" = "black",
  "white" = "white"
}

export enum PlayerHome {
  white = 0,
  black = 25
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

  // todo use infer on starter, to make sure is's one of the first 2 args
  constructor(private white: Player, private black: Player, starter: Player) {
    this._current = starter;
  }

  get current(): Player {
    return this._current;
  }

  get second(): Player {
    return this.current === this.white ? this.black : this.white;
  }

  get White() {
    return this.white;
  }

  get Black() {
    return this.black;
  }

  // todo hide from public api
  toggle(): Player {
    this._current = this.second;
    return this.current;
  }
}
