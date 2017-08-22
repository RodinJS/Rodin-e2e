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
 6. Input empty password
 7. Input password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit

 Validate part:
 -Check username validation message appears "Password must contain at least 8 characters, including numbers and letters"

 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_with_empty_password.tc', () => {
        newUserName = common.NEWUSER.randomUser.Name;
        newUserEmail = common.NEWUSER.randomUser.Email;;
        newUserPass = "";

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUpWIthEmptyField(newUserName, newUserEmail, newUserPass, "password");
    });

});