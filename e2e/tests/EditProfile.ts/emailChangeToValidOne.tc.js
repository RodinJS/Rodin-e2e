/**
 * Created by melkabelka on 25/7/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const EC = protractor.ExpectedConditions;

describe('EditProfile.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    xit('loginWithExistingCridentals.tc', () => {
    	// Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[6].username, common.TESTUSERS[6].password, true);
    });
	

    xit('emailChangeToValidOne.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// clean previous email
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('rodintest@mailinator.com');
        
        // click on Update profile
        objMap.updateProfile.click();

        // check that profile is updated
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');

        // check that email changed. Go create a new project and publish it and get notification about that.
        
        browser.findElement(by.partialLinkText('Dashboard')).click();
        // create a new project with unique URL 
        globalFunc.createProject('Basic', 'TestEmail', 'testemailurl','project description', "", false);

        // open project
        globalFunc.open_project_settings("TestEmail");
        
        // click on publish tab
        objMap.publishTab.click();

        // check that Publish button from publish section is accessable and click on it
        this.publishBtn = element(by.buttonText("Publish"));
        expect(this.publishBtn.isDisplayed()).toBe(true);
        this.publishBtn.click();

    });

    xit('EmailCheck.tc', () => {

        // go to mailinator and check email.
        browser.restart();
        browser.waitForAngularEnabled(false);
        browser.get("https://mailinator.com");

        browser.findElement(by.id('inboxfield')).sendKeys('rodintest');
        element(by.partialButtonText('Go!')).click();

        element(by.className('all_message-min_autor ng-binding')).getText().then((text) =>{ 
            expect(text).toBe('Rodin team1');
        });
    
    });

    xit('Cleanup.tc', () => {

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    
    });

});