export type DiceResut = number;

export class Dice {
  static roll1Dice(): DiceResut {
    return Math.floor(Math.random() * 6 + 1);
  }

  static roll2Dices(): DiceResut[] {
    const dices = [this.roll1Dice(), this.roll1Dice()];

    if (this.dicesAreDouble(dices)) {
      dices.push(...dices);
    }

    return dices;
  }

  static dicesAreDouble(dices: DiceResut[]): boolean {
    return dices[0] === dices[1];
  }
}
