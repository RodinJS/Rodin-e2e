/**
 * Created by mhers on 6/12/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');



/**
 Run Part:
 1. Login with special user to avoid in case of fail make another cases also fail
 2. Change password to password containing special simbols
 3. Sign out and login with new password
 Validate Part:
 1. Check user success logged in
 2. Change password back to old password
 3. Sign out
 4. Login with old password and check user success logged in
 5. Check there is no errors in console

 */

describe('BugRelated.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.PwdChange.username, common.USERS.PwdChange.password, true);
    });
	
    it('RO-605.tc', () => {
        let new_password = "a1!@#$%^&*()_+";
        globalFunc.openEditProfile();
        globalFunc.changePasswordTo(new_password);
        globalFunc.signOut();
        globalFunc.processLogin(common.USERS.PwdChange.username, new_password, true);
        globalFunc.openEditProfile();
        globalFunc.changePasswordTo(common.USERS.PwdChange.password);
        globalFunc.signOut();
        globalFunc.processLogin(common.USERS.PwdChange.username, common.USERS.PwdChange.password, true);
    });

});