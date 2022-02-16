import { PlayerColor } from "./class";
import { initialState } from "./startingState";

class Player {
  constructor(public playerColor: PlayerColor) {}
}

class Board {
  state = initialState;

  white = new Player(PlayerColor.white);
  black = new Player(PlayerColor.black);

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

  currentPlayerInPrison() {
    return this.state.prison.find((c) => c.color === this.currentPlayer);
  }

  currentPlayerCanBearOff() {
    if (this.currentPlayerInPrison()) {
      return false;
    }

    const checkers = this.currentPlayersCheckers();
    return checkers.every((c) => c.position <= 6);
  }

  currentPlayersCheckers() {
    return this.state.points.filter((point) =>
      point.checkers.find((c) => c.color === this.currentPlayer)
    );
  }
}

// function getUniques(arr: any[]) {
//   return arr.filter((value, index, self) => self.indexOf(value) === index);
// }

// function getDuplicates(arr: any[]) {
//   return arr.filter((value, index, self) => self.indexOf(value) !== index);
// }

// function moveChecker(checker: Checker, from: number, dice: number) {
//   let to: number;

//   if (checker.color === PlayerColor.white) {
//     to = Math.max(from - dice, 0);
//   } else {
//     to = Math.min(from + dice, 25);
//   }

//   return to;
// }

const board = new Board();
const l = board.currentPlayer;
console.log(PlayerColor[l]);
console.log(board.roll1Dice());
