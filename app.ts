import { Move, Moves } from "./modules/Board";
import { Player, PlayerColor } from "./modules/Player";
import { Dice, DiceResut, DiceObject } from "./modules/Dice";
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
      this.currentPlayer = this.black
    } else {
      this.currentPlayer = this.white
    }
  }

  PlayerInPrison(player: Player = this.currentPlayer): boolean {
    return this.state.prison.includesCheckerOf(player)
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.getPlayersPoints();
    return points.every(point =>
      point.relativePositionFromHome(this.currentPlayer) <= 6
    );
  }

  getPlayersPoints(player: Player = this.currentPlayer) {
    return this.state.points.filter(point =>
      point.includesCheckerOf(player)
    );
  }

  score(player: Player) {
    const playersPoints = this.getPlayersPoints(player)

    if (this.PlayerInPrison(player)) {
      playersPoints.push(this.state.prison)
    }

    let totalScore = 0;
    for (let point of playersPoints) {
      totalScore += point.relativePositionFromHome(player)
        * point.checkers.length
    }

    return totalScore;
  }

  getAllMovesForPoint(point: Point, dices: DiceResut[], player: Player): Move[] {
    const totalMoves: Move[] = []

    const _loopDices = (dices: DiceObject[]): void => {
      const pointsPath: Point[] = [];
      const usesDices: DiceObject["id"][] = [];
      let currentDistance = 0;

      for (let dice of dices) {
        const target = this.getTargetPoint(point, currentDistance + dice.value, player)
        if (!target || !target.isAvailableFor(player))
          break;

        pointsPath.push(target)
        usesDices.push(dice.id)

        totalMoves.push({
          from: point,
          path: [...pointsPath],
          usesDices: [...usesDices]
        })
        currentDistance += dice.value;
      }
    }

    const dicesObjects = dices.map((value, id) => ({ id, value }))
    dicesObjects.forEach(dice => {
      _loopDices(
        unshiftFrom(dicesObjects, dice)
      )
    })

    return totalMoves
  }

  getTargetPoint(point: Point, dice: DiceResut, player: Player): Point | undefined {
    const position = (player.color === PlayerColor.white)
      ? Math.max(point.position - dice, player.home)
      : Math.min(point.position + dice, player.home);

    return Point.getPointRefByPosition(position as Point['position'], this.state)
  }

  getAllPossibleMoves(dices: DiceResut[], player: Player = this.currentPlayer): Move[] {
    // todo check if in prison
    const possibleMoves: Move[] = [];

    const points = this.getPlayersPoints(player)
    points.forEach(point => {
      const moves = this.getAllMovesForPoint(point, dices, player)
      if (moves.length > 0) {
        possibleMoves.push(...moves)
      }
    })

    return possibleMoves
  }
}
