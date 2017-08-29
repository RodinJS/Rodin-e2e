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
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
	

    it('changePasswordWithInvalidPassword.tc', () => {

        //go to edit profile section
        globalFunc.openEditProfile();
       
       	// go to passwors tab
        objMap.passwordTab.click();

        //type new password in new password field
        objMap.newPassword.sendKeys('Test');

        // confirm you set password
        objMap.confirmPassword.sendKeys('Test');

        // this.confirmPass = element(by.buttonText('Update Password'));
        objMap.confirmPass.click();
        
        // checking that error appeared that specified password is invalid
        
        let error = objMap.newPassword.element(by.xpath("../div[@class='validation error']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Password must contain at least 8 characters, including numbers and letters");
           });
        });

        // Check that no notification poped up, also that password is not updated by sign out and sign in within new password.
        
        expect(objMap.notificationsArray.count()).toBe(0);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

        // login
        globalFunc.processLogin(common.TESTUSERS[3].username,"Test", false);

    });

    it('Cleanup.tc', () => {
    	
    });

});