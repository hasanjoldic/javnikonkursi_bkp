/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRunner: "jest-jasmine2",
  // setupFilesAfterEnv: ["./__tests__/setup/setupEnzyme.ts"],
  // testPathIgnorePatterns: ["./__tests__/setup/"],
  moduleDirectories: ["node_modules", "src"],
  rootDir: "src",
};
