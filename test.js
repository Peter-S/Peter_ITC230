const expect = require('chai').expect;
const player = require('./data');

describe("Sonics '79 Test Module", () => {
  it('Returns requested Player', () => {
    const result = player.get('Jack Sikma');
    expect(result).to.deep.equal({
      player: 'Jack Sikma',
      position: 'C',
      number: '43'
    });
  });

  it('fails w/ invalid player', () => {
    const result = player.get('fake');
    expect(result).to.be.undefined;
  });

  it('Deletes requested Player', () => {
    let num = player.getAll().length
    let newnum = num - 1
    const result = player.deletePlayer('Jack Sikma');
    expect(result).to.deep.equal({
      deleted: true,
      total: newnum
    }); 
  });

  it('Failed, not a valid player to be deleted', () => {
    const result = player.deletePlayer('fake');
    expect(result).to.be.deep.equal({
      deleted: false,
      total: 4
    });
  });

  it('New player was added', () => {
    let num = player.getAll().length
    let newnum = num + 1
    const result = player.addPlayer({
      player: 'Pete Soukup',
      position: 'PF',
      number: '11'
    })
    expect(result).to.be.deep.equal({
      added: true,
      total: newnum
    })
  })

  it('New player was not added - they are already in the list', () => {
    let num = player.getAll().length
    const result = player.addPlayer({
      player: 'Pete Soukup',
      position: 'PF',
      number: '11'
    })
    expect(result).to.be.deep.equal({
      added: false,
      total: num
    })
  }) 
});

