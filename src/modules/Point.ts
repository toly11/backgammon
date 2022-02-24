import { Board } from "..";
import { Checker } from "./Checker";
import { UntilRange } from "../util";
import { Player, PlayerColor } from "./Player";

export type PointNames = Exclude<UntilRange<25>, 0> | 25;

export class Point {
  constructor(public position: PointNames, public checkers: Checker[] = []) {}

  moveFirstCheckerTo(targetPoint: Point) {
    const checker = this.getFirstChecker();
    if (!checker)
      throw new Error("did not get a checker ref, the point may be empty.");

    this.checkers.splice(checker.index, 1);
    targetPoint.checkers.push(checker.ref);
  }

  private getFirstChecker(): { ref: Checker; index: number } | null {
    if (this.checkers.length === 0) {
      return null;
    } else {
      return { index: 0, ref: this.checkers[0] };
    }
  }

  // ! not in use
  get oppisetPosition() {
    return 25 - this.position;
  }

  relativePositionFromHome(player: Player) {
    if (player.color === PlayerColor.white) {
      return this.position;
    } else {
      return player.home.position - this.position;
    }
  }

  isHouse() {
    return this.checkers.length > 1;
  }

  isSingle() {
    return this.checkers.length === 1;
  }

  // todo rename includesCheckersOf
  includesCheckerOf(player: Player) {
    if (!this.checkers.length) {
      return false;
    }

    return !!this.checkers.find(c => c.color === player.color);
  }

  isAvailableFor(player: Player) {
    if (!this.includesCheckerOf(player) && this.isHouse()) {
      return false;
    }
    return true;
  }

  static getPointRefByPosition(
    position: Point["position"],
    points: Board["points"]
  ): Point | undefined {
    return points.find(p => p.position === position);
  }
}
