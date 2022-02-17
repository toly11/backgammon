import { Dice, DiceResut, Moves, Player, PlayerColor, Point } from "./class";
import { initialState } from "./startingState";

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

  // todo make static on Point class (position, state) => Point
  getPointByPosition(position: Point['position']): Point {
    return this.state.points.find(p => p.position === position)!
  }

  getAllMovesForChecker(point: Point, dices: DiceResut[], player: Player) {
    let moves: Moves = {
      from: point,
      toCombinations: []
    }

    const loopDices = (dices: DiceResut[]) => {
      let _total = 0;
      const _moveSteps: Point[] = [];

      for (let dice of dices) {
        const target = this.getTargetPoint(point, dice + _total, player)
        if (!this.isAvailableFor(target, player))
          break;

        _moveSteps.push(Object.assign({}, target))
        moves.toCombinations.push([..._moveSteps])
        _total += dice;
      }
    }

    loopDices(dices)
    if (!Dice.dicesAreDouble(dices)) {
      loopDices(dices.reverse())
    }

    return moves;
  }

  getTargetPoint(point: Point, dice: DiceResut, player: Player): Point {
    const position = (player.color === PlayerColor.white)
      ? Math.max(point.position - dice, player.home)
      : Math.min(point.position + dice, player.home);

    return this.getPointByPosition(position as Point['position'])
  }

  // todo move to Point class
  isAvailableFor(point: Point, player: Player) {
    if ((!point.includesCheckerOf(player)) && point.isHouse()) {
      return false
    }
    return true
  }

  getAllPossibleMoves(dices: DiceResut[], player: Player = this.currentPlayer) {
    // todo check if in prison
    const possibleMoves: Moves[] = [];

    const points = this.getPlayersPoints(player)
    points.forEach(point => {
      const moves = this.getAllMovesForChecker(point, dices, player)
      if (moves.toCombinations.length > 0) {
        possibleMoves.push(moves)
      }
    })

    return possibleMoves
  }
}
