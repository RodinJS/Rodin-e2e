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
 4. Input username
 5. Input email (username+@gmail.com)
 6. Input password
 7. Input empty password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit

 Validate part:
 -Check Password confirm validation message appears "Passwords do not match"

 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_with_empty_passwordConfirm.tc', () => {
        newUserName = common.NEWUSER.randomUser.Name;
        newUserEmail = common.NEWUSER.randomUser.Email;
        newUserPass = common.NEWUSER.randomUser.Password;
        newUserPassConfirm = "";

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUpWIthEmptyField(newUserName, newUserEmail, newUserPass, newUserPassConfirm, "passwordConfirm");
    });

});