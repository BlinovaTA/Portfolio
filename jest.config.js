module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  testEnvironment: "jsdom",
  transform: {
    // process `*.vue` files with `vue-jest`
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
  },
};
