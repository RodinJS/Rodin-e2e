/**
 * Created by xgharibyan on 3/23/17.
 */
const DATE = formatDate(new Date());
let platform;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    directConnect: true,
    standalone: true,
    specs: [
        //'./../tests/**/*.tc.js'
        './../tests/**/UnPublic_project_and_check.tc.js'
    ],
    multiCapabilities: [{
        browserName: 'chrome'
    },
    ],
    allScriptsTimeout: 50000,
    getPageTimeout: 50000,

    baseUrl:'https://rodin.space/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        isVerbose: true,
        includeStackTrace: true
    },

    onPrepare: () => {
        const jasmineReporters = require('jasmine-reporters');
        return browser.getProcessedConfig().then((config) => {
            let browserName = config.capabilities.browserName;
            platform = ((config.capabilities.platformName) ? config.capabilities.platformName : 'Desktop');
            let junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: './reports/xml',
                filePrefix: `${browserName}_${platform}_${DATE}`,
                modifySuiteName: function(generatedSuiteName, suite) {
                    // this will produce distinct suite names for each capability,
                    // e.g. 'firefox.login tests' and 'chrome.login tests'
                    return browserName + '.' + platform + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    },

    onComplete: () => {
        let browserName, browserVersion;
        let capsPromise = browser.getCapabilities();
        capsPromise.then((caps) => {

            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            const HTMLReport = require('../../server/reporter');

            const testConfig = {
                reportTitle: 'Rodin E2E tests report',
                outputPath: `./reports/html/${DATE}`,
                testBrowser: browserName,
                browserVersion: browserVersion,
                platform: platform,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true
            };

            new HTMLReport().from(`./reports/xml/${browserName}_${platform}_${DATE}.xml`, testConfig);
        });
    }
};

function formatDate(date) {

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}_${monthIndex+1}_${day}_Time_${hours}_${minutes}`;
}
