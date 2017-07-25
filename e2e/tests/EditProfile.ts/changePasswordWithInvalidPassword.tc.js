/**
 * Created by melkabelka on 25/7/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const EC = protractor.ExpectedConditions;

describe('AndroidBuild.ts', () => {

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

        // TODO checks with incorrect password login
        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(0);

    });

    it('Cleanup.tc', () => {
    	
    });

});