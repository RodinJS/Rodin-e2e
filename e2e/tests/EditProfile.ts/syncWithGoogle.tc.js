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
    

    it('syncWithGoogle.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();

        this.btnGoogleSync = element(by.partialButtonText('Sync with Google'));
        this.btnGoogleSync.click();

        browser.sleep(5000);

        globalFunc.browserTabChange(1);
        browser.waitForAngularEnabled(false);

        browser.findElement(by.id("identifierId")).sendKeys('rodintesting');
        browser.sleep(3000);
        browser.findElement(by.id("identifierNext")).click();
        browser.sleep(5000);
        browser.findElement(by.name("password")).sendKeys("Qw1234567897");
        browser.findElement(by.id("passwordNext")).click();

        globalFunc.browserTabChange(0);

        browser.sleep(2000);
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Google synced');

        this.objSync = element(by.css('div.col-md-4 > span.ng-binding'));
        expect(this.objSync.getText()).toEqual('Synced as (rodintesting@gmail.com)');
        browser.sleep(2000);

        // unsync from google
        this.objSync.click();
        element(by.partialButtonText("Unsync")).click();

    });

});