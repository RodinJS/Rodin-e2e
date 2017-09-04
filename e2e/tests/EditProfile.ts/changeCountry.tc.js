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
	

    it('changeCountry.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();
       
       	// set user's first name
        objMap.country.sendKeys('Armenia');

        // check country's value
        expect(objMap.country.getAttribute('value')).toEqual('Armenia');

        // click on Update profile
        objMap.updateProfile.click();

        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');

        // wait for object to disappear
        browser.wait(EC.stalenessOf(objMap.notificationsArray), 5000);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

    });

    it('Cleanup.tc', () => {

        // login
        globalFunc.processLogin(common.TESTUSERS[6].username, common.TESTUSERS[6].password, true);

        //go to edit profile section
        globalFunc.openEditProfile();

        // check country's value
        expect(objMap.country.getAttribute('value')).toEqual('Armenia');
       
        // clear first name
        objMap.country.clear();

        // check last name's value
        expect(objMap.country.getAttribute('value')).toEqual('');

        // click on Update profile
        objMap.updateProfile.click();

        // check that password is not updated. No notification pops up.
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');

        // wait for object to disappear
        browser.wait(EC.stalenessOf(objMap.notificationsArray), 5000);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    
    });

});