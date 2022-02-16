import { Player, PlayerColor, PlayerHome, Point } from "./class";
import { initialState } from "./startingState";

export class Board {
  state = initialState;

  white = new Player(PlayerColor.white);
  black = new Player(PlayerColor.black);

  // todo change to Player with props
  currentPlayer: PlayerColor = PlayerColor.white;

  toggleCurrentPlayer() {
    if (this.currentPlayer === PlayerColor.white) {
      this.currentPlayer = PlayerColor.black;
    } else {
      this.currentPlayer = PlayerColor.white;
    }
  }

  roll1Dice() {
    return Math.floor(Math.random() * 6 + 1);
  }

  roll2Dices() {
    const dices = [this.roll1Dice(), this.roll1Dice()];

    if (isDouble(dices)) {
      dices.push(...dices);
    }

    return dices;

    function isDouble(dices: number[]) {
      return dices[0] === dices[1];
    }
  }

  // defaults to current player
  PlayerInPrison(player: PlayerColor = this.currentPlayer): boolean {
    return !!this.state.prison.find((c) => c.color === player);
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.currentPlayersPoints();
    return points.every((point) => point.position <= 6);

    // todo use new pointDistanceFromHome ^ 
  }

  pointDistanceFromHome(point: Point, player: Player): number {
    return player.home - point.position
  }

  currentPlayersPoints() {
    return this.state.points.filter((point) =>
      point.checkers.find((c) => c.color === this.currentPlayer)
    );
  }

  score(player: PlayerColor) {
    const filtered = this.state.points.filter((p) =>
      p.checkers.find((c) => c.color === player)
    );

    let totalScore = 0;
    for (let point of filtered) {
      totalScore += point.checkers.length * point.position;
    }

    if (this.PlayerInPrison(player)) {
      totalScore += this.state.prison.filter(checker =>
        checker.color === player
      ).length * 25
    }

    return totalScore;
  }
}
