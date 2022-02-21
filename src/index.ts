import { MovePath } from "./modules/Board";
import { Player, PlayerColor, Players } from "./modules/Player";
import { Dice, DiceResut } from "./modules/Dice";
import { Point } from "./modules/Point";
import { initialState } from "./startingState";
import { unshiftFrom } from "./util";

export class Board {
  players: Players;

  constructor() {
    const _white = new Player(PlayerColor.white);
    const _black = new Player(PlayerColor.black);

    // todo maybe move this logic to the Players constructor
    const starterDices = Dice.getStarterDices();
    const starter = starterDices[0] > starterDices[1] ? _white : _black;

    this.players = new Players(_white, _black, starter);
  }

  state = initialState;

  PlayerInPrison(player: Player = this.players.current): boolean {
    return this.state.prison.includesCheckerOf(player);
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.getPlayersPoints();
    return points.every(
      point => point.relativePositionFromHome(this.players.current) <= 6
    );
  }

  getPlayersPoints(player: Player = this.players.current) {
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
    player: Player = this.players.current
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
