import * as utils from './utils.js';

// Position ballot creation positive test.
/*
test(`position_ballot must be able to be properly instantiated.`, () => {
    const result = utils.isValidPositionBallot({ positionName: "Treasurer", maxNumCandidates: 3, numVotesAllowed: 2, ballotID: 5});
    expect(result).toBe(true);
});
*/

// Position ballot creation empty positionName negative test.
test(`positionName cannot be empty.`, () => {
    const result = utils.isValidPositionBallot({ positionName: "", maxNumCandidates: 3, numVotesAllowed: 2, ballotID: 5});
    expect(result).toBe(false);
});

// Position ballot creation empty maxNumCandidates negative test.
test(`maxNumCandidates cannot be empty.`, () => {
    const result = utils.isValidPositionBallot({ positionName: "Treasurer", maxNumCandidates: "", numVotesAllowed: 2, ballotID: 5});
    expect(result).toBe(false);
});

// Position ballot creation empty numVotesAllowed negative test.
test(`numVotesAllowed cannot be empty.`, () => {
    const result = utils.isValidPositionBallot({ positionName: "Treasurer", maxNumCandidates: 3, numVotesAllowed: "", ballotID: 5});
    expect(result).toBe(false);
});

// Position ballot creation empty ballotID negative test.
test(`ballotID cannot be empty.`, () => {
    const result = utils.isValidPositionBallot({ positionName: "Treasurer", maxNumCandidates: 3, numVotesAllowed: 2, ballotID: ""});
    expect(result).toBe(false);
});