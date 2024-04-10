const bl = require('../businesslayer');

test('vote successfully cast', async () => {
    const result = await bl.castVote("starbreeze10","position",276,2733, false);
    expect(result).toBe(1);
  });

//   test('cannot cast duplicate vote', async () => {
//     const result = await bl.castVote("starbreeze10","position",276,2733, false);
//     expect(result).toThrow('cannot cast duplicate vote');
//   });

test('votes counted successfully', async () => {
    const result = await bl.getResults(2);
    expect(JSON.stringify(result)).toBe('[{\"id\":5,\"type\":\"position\",\"vote_count\":2},{\"id\":4,\"type\":\"position\",\"vote_count\":2}]');
});
