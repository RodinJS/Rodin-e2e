/**
 * Created by melkabelka on 7/6/17.
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

        globalFunc.openEditProfile();
        this.passwordTab = element(by.linkText('Password'));
        this.passwordTab.click();
        browser.sleep(3000);
        this.newPassword = element(by.model('$ctrl.newPassword.password'));
        this.newPassword.sendKeys('Test');
        this.confirmPassword =  element(by.model('$ctrl.newPassword.confirm'));
        this.confirmPassword.sendKeys('Test');
        this.confirmPass = element(by.buttonText('Update Password'));
        this.confirmPass.click();
        expect(objMap.notificationsArray.count()).toBe(0);
        //expect(objMap.notificationsArray.get(0).getText()).toBe('Password successfully updated');

    });

    it('Cleanup.tc', () => {
    	
    });

});