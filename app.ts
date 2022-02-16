import { Moves, Player, PlayerColor, Point } from "./class";
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

  // todo extract dice to different class
  roll1Dice() {
    return Math.floor(Math.random() * 6 + 1);
  }

  roll2Dices() {
    const dices = [this.roll1Dice(), this.roll1Dice()];

    if (this.dicesAreDouble(dices)) {
      dices.push(...dices);
    }

    return dices;
  }

  dicesAreDouble(dices: number[]) {
    return dices[0] === dices[1];
  }

  PlayerInPrison(player: Player = this.currentPlayer): boolean {
    return !!this.state.prison.find((c) => c.color === player.color);
  }

  currentPlayerCanBearOff(): boolean {
    if (this.PlayerInPrison()) {
      return false;
    }

    const points = this.getPlayersPoints();
    return points.every(point =>
      this.pointDistanceFromHome(point) <= 6
    );
  }

  pointDistanceFromHome(point: Point, player: Player = this.currentPlayer): number {
    if (player.color === PlayerColor.white) {
      return point.position
    } else {
      return player.home - point.position
    }
  }

  getPlayersPoints(player: Player = this.currentPlayer) {
    return this.state.points.filter(point =>
      point.checkers.find(c => c.color === player.color)
    );
  }

  score(player: Player) {
    const filtered = this.state.points.filter(point =>
      // todo use ownedBy method
      point.checkers.find(c => c.color === player.color)
    );

    let totalScore = 0;
    for (let point of filtered) {
      totalScore += point.checkers.length * this.pointDistanceFromHome(point, player);
    }

    if (this.PlayerInPrison(player)) {
      totalScore += this.state.prison.filter(checker =>
        checker.color === player.color
      ).length * 25
    }

    return totalScore;
  }

  getPointByPosition(position: Point['position']): Point {
    return this.state.points.find(p => p.position === position)!
  }

  getAllMovesForChecker(point: Point, dices: number[], player: Player) {
    let moves: Moves = {
      from: point,
      toCombinations: []
    }

    const loopDices = (dices: number[]) => {
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
    if (!this.dicesAreDouble(dices)) {
      loopDices(dices.reverse())
    }

    return moves;
  }

  getTargetPoint(point: Point, dice: number, player: Player): Point {
    const position = (player.color === PlayerColor.white)
      ? Math.max(point.position - dice, player.home)
      : Math.min(point.position + dice, player.home);

    return this.getPointByPosition(position as Point['position'])
  }

  isAvailableFor(point: Point, player: Player) {
    if ((!point.owendBy(player)) && point.isHouse()) {
      return false
    }
    return true
  }

  getAllPossibleMoves(dices: number[], player: Player = this.currentPlayer) {
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
