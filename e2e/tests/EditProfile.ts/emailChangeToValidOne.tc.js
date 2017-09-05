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

    it('loginWithExistingCridentals.tc', () => {
    	// Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[6].username, common.TESTUSERS[6].password, true);
    });
	

    it('emailChangeToValidOne.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// clean previous email
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('rodintesting@mailinator.com');
        
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

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// clean previous email
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('mariam@rodin.io');
        
        // click on Update profile
        objMap.updateProfile.click();

        // check that profile is updated
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');

        //celanUP
        // delete project
    	globalFunc.delete_project("TestEmail",true);
   
    });

    it('EmailCheckaAndCleanup.tc', () => {

        // go to mailinator and check email.
        browser.restart();
        browser.waitForAngularEnabled(false);
        browser.get("https://mailinator.com");

        browser.findElement(by.id('inboxfield')).sendKeys('rodintesting');
        element(by.partialButtonText('Go!')).click();

        //let objM = element(by.css('div[title="FROM"]'));
        //browser.wait(EC.textToBePresentInElement(objM, 'Rodin team'), 15000);

        expect(element(by.css('div[title="FROM"]')).getText()).toBe('Rodin team');

        let objM = element(by.css('div[title="FROM"]'));
        objM.click();
        browser.sleep(7000);

        browser.findElement(by.css('span[title="Delete Emails"]')).click();
        browser.sleep(5000);
        //browser.wait(EC.visibilityOf(delM), 15000);
        //delM.click();
   
    });

});