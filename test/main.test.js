// @ts-check

const { Board } = require("../dist");

describe("Board", () => {
  const board = new Board();

  describe("varify players colors", () => {
    const currentPlayer = board.players.current;

    it("current player should be black||white", () => {
      expect(["black", "white"]).toContain(currentPlayer.color);
    });

    it("toggle() should work", () => {
      const nextPlayer = board.players.toggle();
      expect(currentPlayer.color).not.toEqual(nextPlayer);
    });
  });
});
