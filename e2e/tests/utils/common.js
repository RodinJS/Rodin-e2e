/**
 * Created by xgharibyan on 3/23/17.
 */



const CONSTANTS = {
    spaceURL:'https://rodin.space/',
    designURL:'https://rodin.design/',
    ioURL:'https://rodin.design/',
};

const TESTUSERS = [
    {
        username:'xgharibyan',
        password:'password123456'
    },
    {
        username:'mhers',
        password:'a123456',
    },
    {
        username:'wronguser',
        password:'wrongpass',
    }
];

function goToUrl(url){
    browser.get(url);
}

function inspectLog(){
    browser.manage().logs()
        .get('browser').then((browserLog) => {
        console.log('log: ' + require('util').inspect(browserLog));
    });
}

module.exports = {
    goToUrl:goToUrl,
    inspectLog:inspectLog,
    CONSTANTS:CONSTANTS,
    TESTUSERS:TESTUSERS
};