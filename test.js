const expect = require("chai").expect;
const player = require("./data");

describe("Book module", () => {
  it("returns requested Player", () => {
    const result = player.get('Jack Sikma');
    expect(result).to.deep.equal({
      player: 'Jack Sikma',
      position: 'C',
      number: '43'
    });
  });

  it("fails w/ invalid player", () => {
    const result = player.get("fake");
    expect(result).to.be.undefined;
  });
});