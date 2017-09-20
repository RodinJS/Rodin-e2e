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
 5. Input empty email (username+@gmail.com)
 6. Input password
 7. Input password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit

 Validate part:
 -Check username validation message appears "Invalid email"

 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_with_empty_email.tc', () => {
        newUserName = common.NEWUSER.randomUser.Name;
        newUserEmail = "";
        newUserPass = common.NEWUSER.randomUser.Password;
        newUserPassConfirm = newUserPass;

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUpWIthEmptyField(newUserName, newUserEmail, newUserPass, newUserPassConfirm, "email");
    });

});