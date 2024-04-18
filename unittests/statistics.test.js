const bl = require("../businesslayer");

test("generate society statistics successfully", async () => {
  const societyID = 1; // Assuming the provided societyID exists

  const result = await bl.generateSocietyStatistics(societyID);

  expect(result).toEqual({
    numOfBallots: expect.any(Number),
    members: expect.any(Array),
    avgMembers: expect.any(Number)
  });
});

test("retrieve system statistics successfully", async () => {
  const result = await bl.getSystemStatistics();

  expect(result).toEqual({
    averageQueryTime: expect.arrayContaining([
      expect.objectContaining({
        calculate_average_query_time: expect.any(Number)
      })
    ]),
    activeElections: expect.arrayContaining([
      expect.objectContaining({ active_elections_count: expect.any(Number) })
    ]),
    loggedInUserArrayLength: expect.any(Number)
  });
});
