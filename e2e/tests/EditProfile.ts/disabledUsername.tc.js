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
    

    it('disabledUsername.tc', () => {

        //go to edit profile section
        globalFunc.openEditProfile();

        expect(element(by.model('$ctrl.currentUser.username')).getAttribute('disabled')).toBe('true');
        expect(element(by.model('$ctrl.currentUser.username')).getAttribute('value')).toEqual(common.TESTUSERS[6].username);

    });

    it('Cleanup.tc', () => {

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
    
    });

});