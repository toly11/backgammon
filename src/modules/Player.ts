export enum PlayerColor {
  "black" = "black",
  "white" = "white"
}

export enum PlayerHome {
  black = 25,
  white = 0
}

export class Player {
  // todo move enums into this class.
  home: PlayerHome;

  constructor(public color: PlayerColor) {
    this.home =
      color === PlayerColor.white ? PlayerHome.white : PlayerHome.black;
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
