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
    

    it('syncUnSyncGitHubAccount.tc', () => {

        // go to edit profile section
        globalFunc.openEditProfile();

        this.btnGoogleSync = element(by.partialButtonText('Sync with Github'));
        this.btnGoogleSync.click();

        browser.sleep(5000);

        browser.waitForAngularEnabled(false);

        element(by.id("login_field")).sendKeys("mariam@rodin.io");
        element(by.id("password")).sendKeys("077232028Melka");
        element(by.name("commit")).click();

        //element(by.name("authorize")).click();

        // browser.findElement(by.id("identifierId")).sendKeys('rodintesting');
        // browser.sleep(3000);
        // browser.findElement(by.id("identifierNext")).click();
        // browser.sleep(5000);
        // browser.findElement(by.name("password")).sendKeys("Qw1234567897");
        // browser.findElement(by.id("passwordNext")).click();


        browser.sleep(3000);
        let par = element(by.className("modal-content"));
        par.element(by.className("btn btn-cancel")).click();

        // expect(objMap.notificationsArray.count()).toBe(1);
        // expect(objMap.notificationsArray.get(0).getText()).toBe('github synced');

        this.objSync = element(by.css('div.col-md-10 > span.ng-binding'));
        expect(this.objSync.getText()).toEqual('Synced as (mariam@rodin.io)');
        browser.sleep(2000);

        // cancel unsync from google
        this.objSync.click();
        browser.wait(EC.visibilityOf(objMap.unSyncModal.element(by.partialLinkText("Cancel"))), 5000);
        objMap.unSyncModal.element(by.partialLinkText("Cancel")).click();

        expect(this.objSync.getText()).toEqual('Synced as (mariam@rodin.io)');

        // unsync from google
        this.objSync.click();
        
        this.unSyncBtn = objMap.unSyncModal.element(by.partialButtonText("Unsync"));
        this.unSyncBtn.click();
        expect(objMap.notificationsArray.count()).toBe(1);
        //expect(objMap.notificationsArray.get(0).getText()).toBe('google unsynced');
        browser.wait(EC.textToBePresentInElement(objMap.notificationsArray.get(0).getText(), 'github unsynced'), 5000);

    });

});