const { Board } = require("../dist");

describe("Board", () => {
  const board = new Board();

  describe("varify players colors", () => {
    it("white player should be 1", () => {
      expect(board.white.color).toEqual(1);
    });

    it("black player should be 0", () => {
      expect(board.black.color).toEqual(0);
    });
  });
});
