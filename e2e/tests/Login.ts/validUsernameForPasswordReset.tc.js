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

    it('loginWithExistingCredentials.tc', () => {

        // Login into user account
        globalFunc.isLoginFormDisplayed();
        globalFunc.processLogin(common.TESTUSERS[0].username, common.TESTUSERS[0].password, true);

         // go to edit profile section
        globalFunc.openEditProfile();
       
        // clean previous email address
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('rodintesting@mailinator.com');
        
        // click on Update profile
        objMap.updateProfile.click();

        // check that profile is updated
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');

        browser.sleep(5000);
        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

         // click on forgot password link
        objMap.forgetPswdLink.click();

        // type non existing username
        objMap.resetPassEditBox.sendKeys(common.TESTUSERS[0].username);
        
        // click on Submit button
        objMap.submitBtn.click();
        browser.sleep(3000);

    });

    it('invalidPasswordReset.tc', () => {

        browser.restart();
        browser.waitForAngularEnabled(false);
        browser.get("https://mailinator.com");

        browser.findElement(by.id('inboxfield')).sendKeys('rodintesting');
        element(by.partialButtonText('Go!')).click();
        browser.sleep(7000);

        //let objM = element(by.css('div[title="FROM"]'));
        //browser.wait(EC.textToBePresentInElement(objM, 'Rodin team'), 15000);

        expect(element(by.css('div[title="FROM"]')).getText()).toBe('Rodin team');

        let objM = element(by.css('div[title="FROM"]'));
        objM.click();
        browser.sleep(7000);

        //this.parM = element(by.id("msg_body"));
        browser.switchTo().frame('msg_body');
        browser.findElement(by.tagName('a')).click();
        browser.sleep(10000);
        globalFunc.browserTabChange(1);

        this.passMY = element(by.name("password"));
        browser.wait(EC.visibilityOf(this.passMY), 35000,'Wait for error element to appear').then(()=>{

            this.passMY.sendKeys("12345678");
        });

        this.par = element(by.name("changePasswordForm"));
        let error = this.par.element(by.className('validation ng-binding error'));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Password must contain at least 8 characters, including numbers and letters");
           });

        });

        this.passMY.clear();
        this.passMY.sendKeys("a1234567");
        
        this.confirm = element(by.name("confirm_password"));
        this.confirm.sendKeys("1234567");

        let error1 = this.confirm.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error1), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Passwords do not match");
           });

        });

        
        this.confirm.clear();
        this.confirm.sendKeys("a1234567");

        this.formCon = element(by.name("changePasswordForm"));
        this.formCon.element(by.partialButtonText("Submit")).click();
        browser.sleep(5000);

////////////////////////////////////////////////////////////
        // let error = this.passMY.element(by.xpath("../div[@class='validation ng-binding error']"));

        // browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        // {
        //     error.getText().then(function(text)
        //    {
        //        expect(text).toBe("Password must contain at least 8 characters, including numbers and letters");
        //    });

        // });
//////////////////////////////////////////////////
        //this.parM.element(by.tagName('a')).click();

        // browser.findElement(by.css('span[title="Delete Emails"]')).click();
        // browser.sleep(5000);

        // broser.actions()
        // {
             
        // }
        // browser.actions().
        //     keyDown(Key.CONTROL).
        //     keyDown(Key.T);

        //browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "t")).perform();
        //browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('a').perform();
        //browser.actions().sendKeys("t").perform();
        // globalFunc.isDisplayed_Login_Fields();
        // browser.sleep(5000);
        // browser.actions().keyDown(protractor.Key.CONTROL).
        // objMap.forgetPswdLink.click();

        // var elm = element(by.id('my_id'));

        // browser.actions()
        //     .mouseMove(objMap.forgetPswdLink)
        //     .keyDown(protractor.Key.CONTROL)  // COMMAND for Mac 
        //     .click()
        //     .perform();
// var hotkeys = require('protractor-hotkeys');
        // hotkeys.trigger('ctrl+n');
        // browser.sleep(5000);
        
        // // click on forgot password link
        // objMap.forgetPswdLink.click();

        // // type non existing username
        // objMap.resetPassEditBox.sendKeys(common.TESTUSERS[6].username);
        
        // // click on Submit button
        // objMap.submitBtn.click();

        // // check error
        // browser.wait(EC.textToBePresentInElement(objMap.notificationsArray.get(0).getText(), "User doesn't exist"), 5000);
        // expect(objMap.notificationsArray.count()).toBe(1);
    });

    xit('validUsernameForPasswordReset.tc', () => {

        browser.restart();
        browser.waitForAngularEnabled(false);
        browser.get("https://mailinator.com");

        browser.findElement(by.id('inboxfield')).sendKeys('rodintesting');
        element(by.partialButtonText('Go!')).click();

        //let objM = element(by.css('div[title="FROM"]'));
        //browser.wait(EC.textToBePresentInElement(objM, 'Rodin team'), 15000);

        expect(element(by.css('div[title="FROM"]')).getText()).toBe('Rodin team');

        let objM = element(by.css('div[title="FROM"]'));
        objM.click();
        browser.sleep(7000);

        //this.parM = element(by.id("msg_body"));
        browser.switchTo().frame('msg_body');
        browser.findElement(by.tagName('a')).click();
        browser.sleep(3000);
        globalFunc.browserTabChange(1);

        this.passMY = element(by.name("password"));
        this.passMY.sendKeys("a1234567");

        this.confirm = element(by.name("confirm_password"));
        this.confirm.sendKeys("a1234567");
        this.formCon = element(by.name("changePasswordForm"));
        this.formCon.element(by.partialButtonText("Submit")).click();
        browser.sleep(8000);

        ////////////////////////////////////////////////////////////
        // let error = this.passMY.element(by.xpath("../div[@class='validation ng-binding error']"));

        // browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        // {
        //     error.getText().then(function(text)
        //    {
        //        expect(text).toBe("Password must contain at least 8 characters, including numbers and letters");
        //    });

        // });
//////////////////////////////////////////////////
        //this.parM.element(by.tagName('a')).click();

        // browser.findElement(by.css('span[title="Delete Emails"]')).click();
        // browser.sleep(5000);

        // broser.actions()
        // {
             
        // }
        // browser.actions().
        //     keyDown(Key.CONTROL).
        //     keyDown(Key.T);

        //browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "t")).perform();
        //browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('a').perform();
        //browser.actions().sendKeys("t").perform();
        // globalFunc.isDisplayed_Login_Fields();
        // browser.sleep(5000);
        // browser.actions().keyDown(protractor.Key.CONTROL).
        // objMap.forgetPswdLink.click();

        // var elm = element(by.id('my_id'));

        // browser.actions()
        //     .mouseMove(objMap.forgetPswdLink)
        //     .keyDown(protractor.Key.CONTROL)  // COMMAND for Mac 
        //     .click()
        //     .perform();
// var hotkeys = require('protractor-hotkeys');
        // hotkeys.trigger('ctrl+n');
        // browser.sleep(5000);
        
        // // click on forgot password link
        // objMap.forgetPswdLink.click();

        // // type non existing username
        // objMap.resetPassEditBox.sendKeys(common.TESTUSERS[6].username);
        
        // // click on Submit button
        // objMap.submitBtn.click();

        // // check error
        // browser.wait(EC.textToBePresentInElement(objMap.notificationsArray.get(0).getText(), "User doesn't exist"), 5000);
        // expect(objMap.notificationsArray.count()).toBe(1);
    });
    

    it('changeUserPassword.tc', () => {

        browser.get("login");

        globalFunc.isLoginFormDisplayed();
        globalFunc.processLogin(common.TESTUSERS[0].username, "a1234567", true);

        //go to edit profile section
        globalFunc.openEditProfile();
       
        // clean previous email
        objMap.editEmail.clear();

        // change email to registered one
        objMap.editEmail.sendKeys('mariam@rodin.io');
        
        // click on Update profile
        objMap.updateProfile.click();

        // check that profile is updated
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('Profile Updated');
       
        // go to passwors tab
        objMap.passwordTab.click();

        //type new password in new password field
        objMap.newPassword.sendKeys(common.TESTUSERS[0].password);

        // confirm you set password
        objMap.confirmPassword.sendKeys(common.TESTUSERS[0].password);

        // click on Update button
        objMap.confirmPass.click();

        browser.sleep(7000);

        // check that password is not updated. No notification pops up.
      //  expect(objMap.notificationsArray.count()).toBe(1);
      //  expect(objMap.notificationsArray.get(0).getText()).toBe('Password successfully updated');


        /// sign out
        globalFunc.signOut();

        // // login
        // globalFunc.processLogin(common.TESTUSERS[6].username, "a1234567", false);
        // objMap.passwordField.clear();
        // objMap.userNameField.clear();
        // globalFunc.processLogin(common.TESTUSERS[6].username, common.TESTUSERS[6].password, true);

        // browser.sleep(3000);
        // userMenu1.click();
        // signOut1.click();

    });

});