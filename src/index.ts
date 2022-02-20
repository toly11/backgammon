import { MovePath } from "./modules/Board";
import { Player, PlayerColor, Players } from "./modules/Player";
import { DiceResut } from "./modules/Dice";
import { Point } from "./modules/Point";
import { initialState } from "./startingState";
import { unshiftFrom } from "./util";

export class Board {
  player: Players;

  constructor() {
    const _white = new Player(PlayerColor.white);
    const _black = new Player(PlayerColor.black);

    // todo allow players to roll a single dice each, to determine who's first
    // maybe, add a method on the Dice class, to get 2 dices, making sure they differ
    // and call it, then assign them to white, black. then set as starter the greater one
    this.player = new Players(_white, _black, _white);
  }

  state = initialState;

  // todo change to Player with props

  PlayerInPrison(player: Player = this.player.current): boolean {
    return this.state.prison.includesCheckerOf(player);
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.getPlayersPoints();
    return points.every(
      point => point.relativePositionFromHome(this.player.current) <= 6
    );
  }

  getPlayersPoints(player: Player = this.player.current) {
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
    player: Player = this.player.current
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
