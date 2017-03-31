/**
 * Created by xgharibyan on 3/23/17.
 */
const DATE = formatDate(new Date());
exports.config = {
    seleniumAddress: 'http://40.71.228.192:4444/wd/hub',

    // directConnect: true,
    // standalone: true,
    specs: [
        './../tests/**/*.tc.js'
    ],

  /*  capabilities: {
        browserName: 'chrome',
        platformName: 'Android',
        platformVersion: '7.0',
        deviceName: 'Android Emulator',
    },*/
    multiCapabilities: [{
        browserName: 'chrome',
        'count': 2
    }, {
        browserName: 'firefox',
        'count': 2
    }/*{
        browserName: 'chrome',
        chromeOptions:{
            mobileEmulation:{
                deviceName:'Google Nexus 5'
            }
        }
    }*/],
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
            let junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: './reports/xml',
                filePrefix: `${browserName}_${DATE}`,
                modifySuiteName: function(generatedSuiteName, suite) {
                    // this will produce distinct suite names for each capability,
                    // e.g. 'firefox.login tests' and 'chrome.login tests'
                    return browserName + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    },

    onComplete: () => {
        let browserName, browserVersion;
        let capsPromise = browser.getCapabilities();

        capsPromise.then( (caps) => {

            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

            return browser.manage().logs().get('browser');
        }).then((browserLog)=>{
            const log = require('util').inspect(browserLog);
            console.log('log:',  log, browserLog);
            const HTMLReport = require('../../server/reporter');

            const testConfig = {
                reportTitle: 'Rodin E2E tests report',
                outputPath: `./reports/html/${DATE}`,
                testBrowser: browserName,
                browserVersion: browserVersion,
                browserLog:log,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true
            };

            new HTMLReport().from(`./reports/xml/${browserName}_${DATE}.xml`, testConfig);
        })
    }
};

function formatDate(date) {

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();


    return `${day}_${monthIndex+1}_${year}_${hours}:${minutes}:${seconds}`;
}