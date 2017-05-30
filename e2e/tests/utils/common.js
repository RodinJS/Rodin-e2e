/**
 * Created by xgharibyan on 3/23/17.
 */



const CONSTANTS = {
    spaceURL:'https://rodin.space/',
    designURL:'https://rodin.design/',
    ioURL:'https://rodin.io/',
    googleURL: 'google.com/',
};

const TESTUSERS = [
    {
        username:'xgharibyan',
        password:'password123456'
    },
    {
        username:'mhers',
        password:'a1234567',
    },
    {
        username:'wronguser',
        password:'wrongpass',
    },
    {
        username:'mariam',
        password:'Qw123456',
    }
];

const num = Math.random()*10000000+1;
const TESTPROJECTS = [
    {
        ProjectName:'name'+Math.floor(num),
        ProjectURL:'url'+Math.floor(num),
        ProjectDescription:'description'
    }
];

const TEMPLATENAMES = [
    'Empty Project',
    'Simple Project',
    'Room Project',
    'Deck',
    'Video Control Panel',
    'Drag n Drop'
];

const SYNCACCOUNTS = [
    {
        googleEmail: 'Mher@rodin.io',
        googlePassword: 'Rr14815/*-'
    }
];

const golden = {
    Title_profile_page: 'Account Settings'
};

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
    TESTUSERS:TESTUSERS,
    TESTPROJECTS:TESTPROJECTS,
    TEMPLATENAMES:TEMPLATENAMES,
    SYNCACCOUNTS:SYNCACCOUNTS,
    golden:golden
};