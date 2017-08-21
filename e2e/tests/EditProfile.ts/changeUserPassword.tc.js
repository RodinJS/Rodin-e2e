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
        globalFunc.processLogin(common.TESTUSERS[7].username, common.TESTUSERS[7].password, true);
    });
	

    it('changeUserPassword.tc', () => {

        //go to edit profile section
        globalFunc.openEditProfile();
       
       	// go to passwors tab
        objMap.passwordTab.click();

        //type new password in new password field
        objMap.newPassword.sendKeys('Changed123!');

        // confirm you set password
        objMap.confirmPassword.sendKeys('Changed123!');

        // click on Update button
        objMap.confirmPass.click();

        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Password successfully updated');

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

        // login
        globalFunc.processLogin(common.TESTUSERS[7].username, common.TESTUSERS[7].password, false);
        objMap.passwordField.clear();
        objMap.userNameField.clear();
        globalFunc.processLogin('test', 'Changed123!', true);

    });

    it('Cleanup.tc', () => {

        //go to edit profile section
        globalFunc.openEditProfile();
       
        // go to passwors tab
        objMap.passwordTab.click();

        //type new password in new password field
        objMap.newPassword.sendKeys('Qw123456');

        // confirm you set password
        objMap.confirmPassword.sendKeys('Qw123456');

        // click on Update button
        objMap.confirmPass.click();

        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Password successfully updated');

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    	
    });

});