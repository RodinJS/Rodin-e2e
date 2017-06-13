/**
 * Created by mhers on 6/9/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');



/**
 "Run Part:
 1. User is in Dashboard
 2. User as created 5 project
 3. Click on Add project
 4. Check message
 Validate Part:
 1. Message should be ""Maximum projects count exceeded, allowed project count 5""
 2. Check there is no errors in console"

 */

describe('BugRelated.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        // globalFunc.processLogin(common.TESTUSERS[4].username, common.TESTUSERS[4].password, true);
        globalFunc.processLogin(common.USERS.Limit5.username, common.USERS.Limit5.password, true);
    });
	
    it('RO-700.tc', () => {
        globalFunc.check_notification_text();
    });

});