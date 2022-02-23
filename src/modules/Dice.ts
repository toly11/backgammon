export type SingleDice = number;

export class Dices {
  constructor(public numbers: SingleDice[]) {
    if (Dices.dicesAreDouble(this)) {
      this.isDouble = true;
      this.numbers.push(...this.numbers);
    }
  }

  isDouble = false;

  static roll1Dice(): SingleDice {
    return Math.floor(Math.random() * 6 + 1);
  }

  static roll2Dices(): Dices {
    return new Dices([this.roll1Dice(), this.roll1Dice()]);
  }

  static dicesAreDouble({ numbers }: Dices): boolean {
    return numbers[0] === numbers[1];
  }

  // a weird bug makes tests fail when setting the return type to [DiceResut, DiceResut]
  static getStarterDices(): Dices {
    let dices: Dices;
    do {
      dices = new Dices([this.roll1Dice(), this.roll1Dice()]);
    } while (this.dicesAreDouble(dices));

    return dices;
  }
}
