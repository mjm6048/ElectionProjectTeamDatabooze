import * as utils from "./utils.js";

test(`societyID cannot be null`, () => {
  const result = utils.isValidSociety({
    societyID: null,
    name: "ruhje",
    description: "dfsdfgsd"
  });
  expect(result).toBe(false);
});
test(`name cannot be null or empty spaces`, () => {
  const result = utils.isValidSociety({
    societyID: "dfgdsfg",
    name: "",
    description: "mdke"
  });
  expect(result).toBe(false);
});
test(`societyID has to be an integer`, () => {
  const result = utils.isValidSociety({
    societyID: 7,
    name: "",
    description: "dfsdfgsd"
  });
  expect(result).toBe(false);
});
test(`Description cannot be null or empty spaces`, () => {
  const result = utils.isValidSociety({
    societyID: 7,
    name: "ruhje",
    description: " "
  });
  expect(result).toBe(false);
});
test(`Valid`, () => {
  const result = utils.isValidSociety({
    societyID: 7,
    name: "ruhje",
    description: "sfjsjk"
  });
  expect(result).toBe(true);
});

import * as bl from '../businesslayer.js';

/* Society unit tests */
test('getAllSocieties functions and operates as expected. Should return values', () => {
    const result = bl.getAllSocieties();
    expect(result).toBe('[{societyID: 1,societyName: \"American Medical Association\",societyDescription: \"Medicine\"}]');
});

test('getSociety should return values for SocietyID = 1', () => {
  const result = bl.getSociety(1);
  expect(result).toBe('[{societyID: 1,societyName: \"American Medical Association\",societyDescription: \"Medicine\"}]');
});

test('getSociety should return values for SocietyID = 2', () => {
  const result = bl.getSociety(2);
  expect(result).toBe('[{societyID: 2,societyName: \"American Psychological Association\",societyDescription: \"Psychology\"}]');
});

test('getSociety should not return values because societyID = 0 does not exist', () => {
  const result = bl.getSociety(0);
  expect(result).toBe(false);
});

test('getSociety should not return values because societyID = 80 does not exist', () => {
  const result = bl.getSociety(80);
  expect(result).toBe(false);
});
