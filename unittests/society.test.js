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
