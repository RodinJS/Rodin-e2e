/**
 * Created by Mher Simonyan on 8/21/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');


/**
 Run part:
 1. Open https://rodin.space/login
 2. Click on SignUp
 3. Check URL is
 4. Input username (user+M+D+YY)
 5. Input email (username+@gmail.com)
 6. Input password
 7. Input password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit
 10. Open http://178.62.229.191:7002/
 11. Input username with god role
 12. Input password
 13. Click on Sign in
 14. Click on Users
 15. Search by username (username)

 Validate part:
 16. Check user exists
 17. Remove Users
 18. Click Delete
 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_and_delete_user.tc', () => {
        newUserName = common.NEWUSER.randomUser.Name;
        newUserEmail = common.NEWUSER.randomUser.Email;
        newUserPass = common.NEWUSER.randomUser.Password;

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUp(newUserName, newUserEmail, newUserPass, true);

        console.log("newUserName = "+newUserName);
        console.log("newUserName = "+newUserName);

        url = "http://178.62.229.191:7002/";
        adminUser = common.USERS.MherS.username;
        adminPass = common.USERS.MherS.password;

        globalFunc.processDeleteUser(url, adminUser, adminPass, newUserName);

        // common.goToUrl('login');
        // globalFunc.isDisplayed_Login_Fields();
        // globalFunc.processLogin(newUserName, newUserPass, false);
    });

});