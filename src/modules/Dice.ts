export type DiceResult = number;

export class Dice {
  static roll1Dice(): DiceResult {
    return Math.floor(Math.random() * 6 + 1);
  }

  static roll2Dices(): DiceResult[] {
    const dices = [this.roll1Dice(), this.roll1Dice()];

    if (this.dicesAreDouble(dices)) {
      dices.push(...dices);
    }

    return dices;
  }

  static dicesAreDouble(dices: DiceResult[]): boolean {
    return dices[0] === dices[1];
  }

  // a weird bug makes tests fail when setting the return type to [DiceResut, DiceResut]
  static getStarterDices(): DiceResult[] {
    let dices: DiceResult[];
    do {
      dices = [this.roll1Dice(), this.roll1Dice()];
    } while (this.dicesAreDouble(dices));

    return dices;
  }
}
