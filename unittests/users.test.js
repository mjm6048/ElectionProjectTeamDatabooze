import * as utils from "./utils.js";

test(`username cannot be null or empty spaces`, () => {
  const result = utils.isValidUsers({
    username: " ",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: 1
  });
  expect(result).toBe(false);
});

test(`firstname cannot be null or empty spaces`, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: " ",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: 1
  });
  expect(result).toBe(false);
});

test(`lastname cannot be null or empty spaces`, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dvid",
    lastname: " ",
    passwordHash: "Password23!",
    roleID: 1
  });
  expect(result).toBe(false);
});

test(`lastname cannot be null or empty spaces`, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: " ",
    roleID: 1
  });
  expect(result).toBe(false);
});

test(`roleID cannot be null`, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: null
  });
  expect(result).toBe(false);
});

test(`role cannot be greater to 3`, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: 5
  });
  expect(result).toBe(false);
});

test(`username has to start with lowercase and have letters or numbers `, () => {
  const result = utils.isValidUsers({
    username: "User2",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: 3
  });
  expect(result).toBe(false);
});

test(`password has to have atleast 8 characters ,lowercase,capital,special character `, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dvid",
    lastname: "lee",
    passwordHash: "23!",
    roleID: 3
  });
  expect(result).toBe(false);
});
test(`firstname cannot be number `, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "34",
    lastname: "lee",
    passwordHash: "Password23!",
    roleID: 3
  });
  expect(result).toBe(false);
});

test(`firstname cannot be number `, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dbr",
    lastname: "845",
    passwordHash: "Password23!",
    roleID: 3
  });
  expect(result).toBe(false);
});
test(`Valid `, () => {
  const result = utils.isValidUsers({
    username: "user2",
    firstname: "dbr",
    lastname: "ijop",
    passwordHash: "Password23!",
    roleID: 3
  });
  expect(result).toBe(true);
});

import * as bl from '../businesslayer.js';

test('valid', () => {
  const result = bl.createEditUser('moomincloud45' , '1d707811988069ca760826861d6d63a10e8c3b7f171c4441a6472ea58c11711b', 'Jeffery' , 1);
  expect(result).toBe(1);
});