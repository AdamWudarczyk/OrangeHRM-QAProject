export default defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true
  }
})