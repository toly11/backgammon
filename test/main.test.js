// @ts-check

const { Board } = require("../dist");

describe("Board", () => {
  const board = new Board();

  describe("varify players colors", () => {
    const currentPlayer = board.players.current;

    it("current player should be 0||1", () => {
      expect([0, 1]).toContain(currentPlayer.color);
    });

    it("toggle() should word", () => {
      const nextPlayer = Math.abs(currentPlayer.color - 1); // toggles 1 and 0
      expect(board.players.toggle().color).toEqual(nextPlayer);
    });
  });
});
