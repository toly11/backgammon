import { MovePath } from "./modules/Board";
import { Player, PlayerColor, Players } from "./modules/Player";
import { Dices, SingleDice } from "./modules/Dice";
import { Point } from "./modules/Point";
import { initialPointsState } from "./initialState";
import { unshiftFrom } from "./util";

interface Turn {
  dices: Dices;
  player: Player;
  possibleMoves: MovePath[];
}

interface CompletedTurn extends Turn {
  submittedMove: MovePath[];
}

export class Board {
  // todo make private whatever is possible
  players: Players;
  private turnsHistory: CompletedTurn[] = [];
  private currentTurn: Turn;

  points = initialPointsState;

  constructor() {
    const _white = new Player(PlayerColor.white);
    const _black = new Player(PlayerColor.black);

    // todo maybe move this logic to the Players constructor
    const dices = Dices.getStarterDices();
    const starter = dices.numbers[0] > dices.numbers[1] ? _white : _black;

    this.players = new Players(_white, _black, starter);

    this.currentTurn = {
      player: starter,
      dices,
      possibleMoves: this.getAllMovePaths(dices, starter)
    };
  }

  getMove(): Turn {
    return this.currentTurn;
  }

  submitMove(submittedMove: MovePath[]) {
    // todo validate move.

    this.turnsHistory.push({ ...this.currentTurn, submittedMove });

    this.generateNextMove();
  }

  private generateNextMove() {
    const dices = Dices.roll2Dices();
    const player = this.players.toggle();
    const possibleMoves = this.getAllMovePaths(dices, player);

    this.currentTurn = { dices, player, possibleMoves };

    // todo test the logic
    // if (possibleMoves.length === 0) {
    //   this.submitMove([]);
    // }
  }

  PlayerInPrison(player: Player = this.players.current): boolean {
    return player.prison.checkers.length > 0;
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
    return this.points.filter(point => point.includesCheckerOf(player));
  }

  score(player: Player) {
    const playersPoints = this.getPlayersPoints(player);

    if (this.PlayerInPrison(player)) {
      playersPoints.push(player.prison);
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
    dice: SingleDice,
    player: Player
  ): Point | undefined {
    const position =
      player.color === PlayerColor.white
        ? Math.max(point.position - dice, player.home.position)
        : Math.min(point.position + dice, player.home.position);

    return Point.getPointRefByPosition(
      position as Point["position"],
      this.points
    );
  }

  getMovePathsForPoint(point: Point, dices: Dices, player: Player): MovePath[] {
    const pointPaths: MovePath[] = [];

    const LoopDices = (dices: SingleDice[]): void => {
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

    dices.numbers.forEach(dice => {
      LoopDices(unshiftFrom(dices.numbers, dice));
    });

    return pointPaths;
  }

  getAllMovePaths(
    dices: Dices,
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
