const bl = require('../businesslayer');

test('vote successfully cast', async () => {
    const login = await bl.userExists('starbreeze10','1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b');
    console.log(login);
    const result = await bl.castVote('starbreeze10','position',6,'12', false);
    expect(result).toBe(1);
  });

// test('cannot cast duplicate vote', async () => {
//     const result = await bl.castVote('applebreeze16','position',6,'12', false);
//     expect().toBe(-1);
//   });

test('cannot cast vote for inactive electtion', async () => {
    const result = await bl.castVote("applebreeze16","position",2,'2', false);
    expect(result).toBe(-1);
  });
  test('candidate does not exist', async () => {
    const result = await bl.castVote("applebreeze16","position",5,'733', false);
    expect(result).toBe(-2);
  });
test('votes counted successfully', async () => {
    const result = await bl.getResults(2,"applebreeze16");
    expect(JSON.stringify(result)).toBe('{\"result\":[{\"id\":4,\"type\":\"position\",\"voted\":\"7\",\"highest_vote_count\":2},{\"id\":4,\"type\":\"position\",\"voted\":\"8\",\"highest_vote_count\":1},{\"id\":5,\"type\":\"position\",\"voted\":\"10\",\"highest_vote_count\":2},{\"id\":5,\"type\":\"position\",\"voted\":\"11\",\"highest_vote_count\":1},{\"id\":6,\"type\":\"position\",\"voted\":\"12\",\"highest_vote_count\":1}],\"status\":{\"usernames\":[{\"username\":\"chestnutrainbow1\"},{\"username\":\"peachwind18\"},{\"username\":\"sealstorm15\"},{\"username\":\"applebreeze16\"}],\"usernumber\":\"12\"}}');
});

test('votes should not display for user if ballot hasnt ended', async()=>
{
    const result= await bl.getResults(25,"applebreeze16");
    expect(result).toBe(-1);

});
test('votes should not display for user that doesn\'t have exist', async()=>
{
    const result= await bl.getResults(2,"starbrdfdf10");
    expect(result).toBe(0);

});
test('votes should not display for user that doesn\'t have officer or above role', async()=>
{
    const result= await bl.getResults(12,"starbreeze10");
    expect(result).toBe(0);

});
test('votes should not display for user if ballot is not accessible', async()=>
{
    const result= await bl.getResults(27,"applebreeze16");
    expect(result).toBe(-1);

});
test('ballot status obtained successfully', async () => {
  const result = await bl.getStatus(2,"applebreeze16");
  expect(JSON.stringify(result)).toBe('{\"usernames\":[{\"username\":\"chestnutrainbow1\"},{\"username\":\"peachwind18\"},{\"username\":\"sealstorm15\"},{\"username\":\"applebreeze16\"}],\"usernumber\":\"12\"}')
});