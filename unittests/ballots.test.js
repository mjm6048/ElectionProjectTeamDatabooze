import * as utils from './utils.js';

test(`Name cannot be null or empty spaces`, () => {
    const result = utils.isValidBallot({ name: " ", description: "dfsdfgsd", startDate: "1.10.2024", endDate: "2.10.2024", societyID: 12 });
    expect(result).toBe(false);

});
test(`Description cannot be null or empty spaces`, () => {
    const result = utils.isValidBallot({ name: "dfgdsfg", description: "   ", startDate: "1.10.2024", endDate: "2.10.2024", societyID: 12 });
    expect(result).toBe(false);

});
test(`startdate cannot be null or empty spaces`, () => {
    const result = utils.isValidBallot({ name: "dfgdsfg", description: "fdgf", endDate: "2.10.2024", societyID: 12 });
    expect(result).toBe(false);

});

test(`societyID has to be an integer`, () => {
    const result = utils.isValidBallot({ name: "dfgdsfg", description: "dfdf", startDate: "1.10.2024", endDate: "2.10.2024", societyID: "fddsf" });
    expect(result).toBe(false);

});
test(`Start date cannot be after end date`, () => {
    const result = utils.isValidBallot({ name: "election 2024", description: "dfsdfgsd", startDate: "03.10.2024", endDate: "02.10.2024", societyID: 12 });
    expect(result).toBe(false);

});
test(`Valid Ballot`, () => {
    const result = utils.isValidBallot({ name: "election 2024", description: "dfsdfgsd", startDate: "01.10.2024", endDate: "02.10.2024", societyID: 12 });
    expect(result).toBe(true);

});

import * as bl from '../businesslayer.js';

/* Acutal Ballot unit tests */
test('BallotExists returns true', () => {
    const result = bl.BallotExists(2);
    expect(result).toBe(true);
});

test('BallotExists return false ', () => {
    const result = bl.BallotExists(0);
    expect(result).toBe(false);
});

test('getBallot returns a ballot ', () => {
    const result = bl.getBallot(2);
    expect(result).toBe('[{ballotID: 2,ballotName: \"2001 Board Elections\",startDate: \"2001-07-21\",endDate: \"2001-09-12\",SocietyID: 1,}]');
});

