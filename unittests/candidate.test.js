import * as utils from './utils.js';

// positave test will good data
test(`candidate must be able to be created when populated`,()=>{
    const result = utils.isValidCandidate({username:"Godfree McMannish", titles: "Mr(s) President", candidateDescription:"A very nice person who will give free money to all", photo:"./images/candidates/cutepic.jpg"});
    expect(result).toBe(true);
    });
// negitave test for empty username
test(`candidate username can not be empty`,()=>{
    const result = utils.isValidCandidate({username:"", titles: "Mr(s) President", candidateDescription:"A very nice person who will give free money to all", photo:"./images/candidates/cutepic.jpg"});
        expect(result).toBe(false);
    });
//negitave test for empty title
test(`candidate title can not be empty`,()=>{
    const result = utils.isValidCandidate({username:"Godfree McMannish", titles: "", candidateDescription:"A very nice person who will give free money to all", photo:"./images/candidates/cutepic.jpg"});
        expect(result).toBe(false);
    });
//negitave test for empty candidateDescription
test(`candidateDescription can not be empty`,()=>{
    const result = utils.isValidCandidate({username:"Godfree McMannish", titles: "Mr(s) President", candidateDescription:"", photo:"./images/candidates/cutepic.jpg"});
        expect(result).toBe(false);
    });
//negitave test for empty candidate photo
test(`candidate photo can not be empty`,()=>{
    const result = utils.isValidCandidate({username:"Godfree McMannish", titles: "Mr(s) President", candidateDescription:"A very nice person who will give free money to all", photo:""});
        expect(result).toBe(false);
    });
