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
	

    it('removeEmail.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// clean previous email
        objMap.editEmail.clear();
        
        // click on Update profile
        objMap.updateProfile.click();

        let error = objMap.editEmail.element(by.xpath("../div[@class='validation error ng-scope']"));
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
            {
                expect(text).toBe("Email is invalid");
            });

        });

        // check that email is not removed
        expect(objMap.notificationsArray.count()).toBe(0);

    });

    it('Cleanup.tc', () => {

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    
    });

});