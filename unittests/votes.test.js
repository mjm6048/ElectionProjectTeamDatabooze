const bl = require('../businesslayer');

test('vote successfully cast', async () => {
    const votes =[
      {voteType:'position',itemID: 6,candidateID: 12, writein: ''},
      {voteType:'position',itemID: 5,candidateID: 11, writein: ''}
    ]
    const login = await bl.userExists('peachwind18','Password!1');
    const login2 = await bl.userExists('applebreeze16','Password!1');
    const result = await bl.castVote('peachwind18',2,votes,[]);
    expect(result).toBe(votes.length);
  });

// test('cannot cast duplicate vote', async () => {
//     const votes =[ {voteType:'position',itemID: 6,votedFor: '12', writein: false}];
//     const result = await bl.castVote('peachwind18',2,votes);
//     expect().toBe(-1);
//   });

  // test('candidate does not exist', async () => {
  //   const votes =[ {voteType:'position',itemID: 5,candidateID: 733, writein: ''}];
  //   const result = await bl.castVote("peachwind18",2,votes,[]);
  //   expect(result).toBe(-2);
  // });
test('votes counted successfully', async () => {
    const result = await bl.getResults(2,"applebreeze16");
    expect(JSON.stringify(result)).toBe('{\"result\":[{\"id\":4,\"candidateid\":7,\"firstname\":\"Dylan\",\"lastname\":\"King\",\"num_votes\":2},{\"id\":4,\"candidateid\":8,\"firstname\":\"Laura\",\"lastname\":\"Mitchell\",\"num_votes\":1},{\"id\":5,\"candidateid\":10,\"firstname\":\"Aaron\",\"lastname\":\"Gonzalez\",\"num_votes\":2},{\"id\":5,\"candidateid\":11,\"firstname\":\"Betty\",\"lastname\":\"Hanson\",\"num_votes\":2},{\"id\":6,\"candidateid\":12,\"firstname\":\"Mary\",\"lastname\":\"Reed\",\"num_votes\":1}],\"status\":{\"usernames\":[{\"username\":\"chestnutrainbow1\"},{\"username\":\"peachwind18\"},{\"username\":\"sealstorm15\"}],\"usernumber\":\"12\"}}');
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
    const result= await bl.getResults(2,"peachwind18");
    expect(result).toBe(0);

});
test('votes should not display for user if ballot is not accessible', async()=>
{
    const result= await bl.getResults(27,"applebreeze16");
    expect(result).toBe(-1);

});
test('ballot status obtained successfully', async () => {
  const result = await bl.getStatus(2,"applebreeze16");
  expect(JSON.stringify(result)).toBe('{\"usernames\":[{\"username\":\"chestnutrainbow1\"},{\"username\":\"peachwind18\"},{\"username\":\"sealstorm15\"}],\"usernumber\":\"12\"}')
});