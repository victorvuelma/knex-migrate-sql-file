const { up, down } = require("./index")();

const stubTrx = {
  raw: jest.fn(sql => sql),
  commit: jest.fn(),
};

const stubKnex = {
  transaction: jest.fn(() => stubTrx),
};
sql => sql;
describe("Function", () => {
  describe("up()", () => {
    it("should execute knex.raw() for .up.sql file", async () => {
      await up(stubKnex);

      expect(stubKnex.transaction).toHaveBeenCalled();
      expect(stubTrx.raw).toHaveBeenCalledTimes(2);
      expect(stubTrx.commit).toHaveBeenCalled();
    });
  });

  describe("down()", () => {
    it("should execute knex.raw() for .down.sql file", async () => {
      await down(stubKnex);

      expect(stubKnex.transaction).toHaveBeenCalled();
      expect(stubTrx.raw).toHaveBeenCalled();
      expect(stubTrx.commit).toHaveBeenCalled();
    });
  });
});
