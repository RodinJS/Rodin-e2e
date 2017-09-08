/**
 * Created by Mher Simonyan on 8/28/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');


/**
 Run part:
 1. Open https://rodin.space/login
 2. Click on SignUp
 3. Check URL
 4. Input username (user+M+D+YY)
 5. Input email (username+@gmail.com)
 6. Input password
 7. Input password confirm
 8. Click agree checkbox
 9. Click on Sign up to submit
 10. Sign-out
 11. Click on SignUp
 12. Input same username (user+M+D+YY)
 13. Input email (username+@gmail.com)
 14. Input password
 15. Input password confirm
 16. Click agree checkbox
 17. Click on Sign up to submit

 Validate part:
 -Check notification message appears "User name or Email already exists"

 -Open http://178.62.229.191:7002/
 -Input username with god role
 -Input password
 -Click on Sign in
 -Click on Users
 -Search by username (username)
 -Remove Users
 -Click Delete
 -Open login page
 -Try to login with deleted user cridental
 -Check notification message appears "Wrong username or password"
 */

describe('SignUp.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('register');
    });

    it('SignUp_with_existing_user.tc', () => {
        newUserName = common.NEWUSER.randomUser.Name;
        newUserEmail = common.NEWUSER.randomUser.Email;
        newUserPass = common.NEWUSER.randomUser.Password;

        globalFunc.isDisplayed_SignUp_Fields();
        globalFunc.processSignUp(newUserName, newUserEmail, newUserPass, true);

        console.log("newUserName = "+newUserName);
        console.log("newUserPass = "+newUserPass);

        globalFunc.signOut();
        common.goToUrl('register');

        globalFunc.processSignUp(newUserName, common.NEWUSER.randomUser.Email, newUserPass, false);

        url = "http://178.62.229.191:7002/";
        adminUser = common.USERS.MherS.username;
        adminPass = common.USERS.MherS.password;

        globalFunc.processDeleteUser(url, adminUser, adminPass, newUserName);

        common.goToUrl('login');
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(newUserName, newUserPass, false);
    });

});