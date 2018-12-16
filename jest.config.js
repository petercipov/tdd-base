module.exports = {
  "roots": [
    "<rootDir>/src",
    "<rootDir>/test"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/test/.*|(\\.|/))spec\\.ts?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}