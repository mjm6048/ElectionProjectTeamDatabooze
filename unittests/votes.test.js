const bl = require('../businesslayer');

// test('vote successfully cast', async () => {
//     const result = await bl.castVote("starbreeze10","position",276,2733, false);
//     expect(result).toBe(1);
//   });

//   test('cannot cast duplicate vote', async () => {
//     const result = await bl.castVote("starbreeze10","position",276,2733, false);
//     expect(result).toThrow('cannot cast duplicate vote');
//   });

test('votes counted successfully', async () => {
    const result = await bl.getResults(2,"applebreeze16");
    expect(JSON.stringify(result)).toBe('[{\"id\":5,\"type\":\"position\",\"votedfor\":\"345\",\"vote_count\":2},{\"id\":4,\"type\":\"position\",\"votedfor\":\"123\",\"vote_count\":2}]');
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