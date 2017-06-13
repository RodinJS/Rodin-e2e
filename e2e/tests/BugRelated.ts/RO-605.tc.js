/**
 * Created by mhers on 6/12/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');



/**
Run Part:

Validate Part:

 */

describe('BugRelated.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[5].username, common.TESTUSERS[5].password, true);
    });
	
    it('RO-605.tc', () => {
        let new_password = "a1!@#$%^&*()_+";
        globalFunc.openEditProfile();
        globalFunc.changePasswordTo(new_password);
        globalFunc.signOut();
        globalFunc.processLogin(common.TESTUSERS[5].username, new_password, true);
        globalFunc.openEditProfile();
        globalFunc.changePasswordTo(common.TESTUSERS[5].password);
        globalFunc.signOut();
        globalFunc.processLogin(common.TESTUSERS[5].username, common.TESTUSERS[5].password, true);
    });

});