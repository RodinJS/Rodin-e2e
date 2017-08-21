/**
 * Created by xgharibyan on 3/23/17.
 */

const num = Math.random()*10000000+1;

const CONSTANTS = {
    spaceURL:'https://rodin.space/',
    //spaceURL:'http://rodinapp.com/',
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
        password:'!(Mariamik1)?',
    },
    {   // User with created 5 projects (Project limit is 5)
        username:'mher6',
        password:'a1234567',
    },

    {   // User for Change password (Use this user, to be independent form other test cases )
        username:'mher13',
        password:'a1234567',
    },
    {   // User who is not synced with gitHub 
        username:'mmmm',
        password:'Qw123456',
    }
];

const USERS = {
    Xach: {
        username: 'xgharibyan',
        password: 'password123456'
    },
    MherS: {
        username: 'mhers',
        password: 'a1234567',
    },
    Wrong: {
        username: 'wronguser',
        password: 'wrongpass',
    },
    Mariam: {
        username: 'mariam',
        password: 'Qw123456',
    },
    Limit5: {   // User with created 5 projects (Project limit is 5)
        username: 'mher6',
        password: 'a1234567',
    },
    PwdChange: {   // User for Change password (Use this user, to be independent form other test cases )
        username: 'mher13',
        password: 'a1234567',
    }
};

// SignUp Users
const NEWUSER = {
    randomUser: {
        Name: 'user' + Math.floor(num),
        Email: 'user' + Math.floor(num) + '@gmail.com',
        Password: 'a1234567'
    }
};

// Old syntax
const TESTPROJECTS = [
    {
        ProjectName:'name'+Math.floor(num),
        ProjectURL:'url'+Math.floor(num),
        ProjectDescription:'description'
    }
];

// New
const PROJECTS = {
    Name:'name'+Math.floor(num),
    URL:'url'+Math.floor(num),
    Description:'description'
};



// Old syntax
const TEMPLATENAMES = [
    'Empty Project',
    'Simple Project',
    'Room Project',
    'Deck',
    'Video Control Panel',
    'Drag n Drop'
];

// New syntax
const TEMPLATES = {
    Empty: {
        name: 'Blank'               // 'Empty Project'
    },
    Basic: {
        name: 'Basic'               // 'Simple Project'
    },
    DragDrop: {
        name: "Drag'n'Drop"         // 'Drag n Drop'
    },
    PresentationHall: {
        name: "Presentation Hall"
    },
    Interior: {
        name: "Interior"
    },
    VideoPlayer360: {
        name: "360 Video Player"
    },
    VideoGallery: {
        name: "Video Gallery"
    },
    PullFromGitHub: {
        name: "Pull From GitHub"
    }
};

const SYNCACCOUNTS = [
    {
        googleEmail: 'Mher@rodin.io',
        googlePassword: 'Rr14815/*-'
    }
];

const golden = {
    Title_profile_page: 'Account Settings',
    Max_project_count_msg: 'Maximum projects count exceeded, allowed project count 5'
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
    USERS:USERS,
    TESTPROJECTS:TESTPROJECTS,
    PROJECTS:PROJECTS,
    TEMPLATENAMES:TEMPLATENAMES,
    TEMPLATES:TEMPLATES,
    SYNCACCOUNTS:SYNCACCOUNTS,
    golden:golden,
    NEWUSER:NEWUSER
};