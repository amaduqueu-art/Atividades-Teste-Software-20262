const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationteststore.com",
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    defaultCommandTimeout: 12000,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});