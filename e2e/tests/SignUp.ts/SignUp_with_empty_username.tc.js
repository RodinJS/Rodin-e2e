/**
 * Created by Mher Simonyan on 9/8/2017.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');


/**
 Run part:
 1. Open https://rodin.space/login
 2. Click on SignUp
 3. Check URL
 4. Input empty username
 5. Input email (username+@gmail.com)
 6. Input password
 7. Input password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit

 Validate part:
 -Check username validation message appears "Username must contain at least 3 characters"

 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_with_empty_username.tc', () => {
        newUserName = "";
        newUserEmail = common.NEWUSER.randomUser.Email;
        newUserPass = common.NEWUSER.randomUser.Password;
        newUserPassConfirm = newUserPass;

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUpWIthEmptyField(newUserName, newUserEmail, newUserPass, newUserPassConfirm, "username");
    });

});