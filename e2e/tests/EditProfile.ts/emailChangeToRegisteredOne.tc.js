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
	

    it('emailChangeToRegisteredOne.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// clean previous email
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('mariam.adamyan92@gmail.com');

        // click on Update profile
        objMap.updateProfile.click();

        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Email already in use.');

    });

    it('Cleanup.tc', () => {

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    
    });

});