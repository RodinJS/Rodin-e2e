/**
 * Created by mhers on 6/9/17.
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
        globalFunc.processLogin(common.TESTUSERS[4].username, common.TESTUSERS[4].password, true);
    });
	
    it('RO-700.tc', () => {
        globalFunc.check_notification_text();
    });

});