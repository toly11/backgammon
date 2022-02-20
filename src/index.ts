import { MovePath } from "./modules/Board";
import { Player, PlayerColor } from "./modules/Player";
import { DiceResut } from "./modules/Dice";
import { Point } from "./modules/Point";
import { initialState } from "./startingState";
import { unshiftFrom } from "./util";

export class Board {
  state = initialState;

  white = new Player(PlayerColor.white);
  black = new Player(PlayerColor.black);

  // todo change to Player with props
  currentPlayer: Player = this.white;

  toggleCurrentPlayer() {
    if (this.currentPlayer.color === PlayerColor.white) {
      this.currentPlayer = this.black;
    } else {
      this.currentPlayer = this.white;
    }
  }

  PlayerInPrison(player: Player = this.currentPlayer): boolean {
    return this.state.prison.includesCheckerOf(player);
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.getPlayersPoints();
    return points.every(
      point => point.relativePositionFromHome(this.currentPlayer) <= 6
    );
  }

  getPlayersPoints(player: Player = this.currentPlayer) {
    return this.state.points.filter(point => point.includesCheckerOf(player));
  }

  score(player: Player) {
    const playersPoints = this.getPlayersPoints(player);

    if (this.PlayerInPrison(player)) {
      playersPoints.push(this.state.prison);
    }

    let totalScore = 0;
    for (let point of playersPoints) {
      totalScore +=
        point.relativePositionFromHome(player) * point.checkers.length;
    }

    return totalScore;
  }

  getTargetPoint(
    point: Point,
    dice: DiceResut,
    player: Player
  ): Point | undefined {
    const position =
      player.color === PlayerColor.white
        ? Math.max(point.position - dice, player.home)
        : Math.min(point.position + dice, player.home);

    return Point.getPointRefByPosition(
      position as Point["position"],
      this.state
    );
  }

  getMovePathsForPoint(
    point: Point,
    dices: DiceResut[],
    player: Player
  ): MovePath[] {
    const pointPaths: MovePath[] = [];

    const LoopDices = (dices: DiceResut[]): void => {
      const movePath: MovePath = [];
      let distance = 0;
      let lastPoint = point;

      for (let dice of dices) {
        const target = this.getTargetPoint(point, distance + dice, player);
        if (!target || !target.isAvailableFor(player)) {
          break;
        }

        movePath.push({ from: lastPoint, to: target, uses: dice });

        distance += dice;
        lastPoint = target;
      }

      if (movePath.length > 0) {
        pointPaths.push(movePath);
      }
    };

    dices.forEach(dice => {
      LoopDices(unshiftFrom(dices, dice));
    });

    return pointPaths;
  }

  getAllMovePaths(
    dices: DiceResut[],
    player: Player = this.currentPlayer
  ): MovePath[] {
    // todo check if in prison
    const allMovePaths: MovePath[] = [];

    const points = this.getPlayersPoints(player);
    for (let point of points) {
      const moves = this.getMovePathsForPoint(point, dices, player);
      if (moves.length > 0) {
        allMovePaths.push(...moves);
      }
    }

    return allMovePaths;
  }
}
