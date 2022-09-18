/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { resolve, join } = require("path");
const { lstatSync, readdirSync } = require("fs");
const scope = `@radroots`
const packages = `packages`
const directory = resolve(__dirname, packages);
const list = readdirSync(directory).filter((read) =>
  lstatSync(join(directory, read)).isDirectory()
);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
    ...list.reduce(
      (acc, name) => ({
        ...acc,
        [`${scope}/${name}(.*)$`]: `<rootDir>/${packages}/./${name}/src/$1`,
      }),
      {}
    ),
  },
  modulePathIgnorePatterns: [
    ...list.reduce(
      (acc, name) => [...acc, `<rootDir>/${packages}/${name}/lib`],
      []
    ),
  ],
  testTimeout: 40000
};