import { MovePath } from "./modules/Board";
import { Player, PlayerColor, Players } from "./modules/Player";
import { Dice, DiceResult } from "./modules/Dice";
import { Point } from "./modules/Point";
import { initialState } from "./initialState";
import { unshiftFrom } from "./util";

interface Turn {
  dices: DiceResult[];
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

  state = initialState;

  constructor() {
    const _white = new Player(PlayerColor.white);
    const _black = new Player(PlayerColor.black);

    // todo maybe move this logic to the Players constructor
    const starterDices = Dice.getStarterDices();
    const starter = starterDices[0] > starterDices[1] ? _white : _black;

    this.players = new Players(_white, _black, starter);

    this.currentTurn = {
      player: starter,
      dices: starterDices,
      possibleMoves: this.getAllMovePaths(starterDices, starter)
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
    const dices = Dice.roll2Dices();
    const player = this.players.toggle();
    const possibleMoves = this.getAllMovePaths(dices, player);

    this.currentTurn = { dices, player, possibleMoves };

    // todo test the logic
    // if (possibleMoves.length === 0) {
    //   this.submitMove([]);
    // }
  }

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
    dice: DiceResult,
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
    dices: DiceResult[],
    player: Player
  ): MovePath[] {
    const pointPaths: MovePath[] = [];

    const LoopDices = (dices: DiceResult[]): void => {
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
    dices: DiceResult[],
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
