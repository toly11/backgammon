// white:  0=home,  25=prison
// black:  25=home, 0=prison

export enum PlayerColor {
  "black",
  "white",
}

export class Checker {
  color: PlayerColor;

  constructor(color: PlayerColor) {
    this.color = color;
  }
}
