/**
 * Created by xgharibyan on 3/23/17.
 */

const common = require('../utils/common');
const Login = require('../components/login');


/**
 * "Run Part:
 1. Write page URL (Rondin.space) in browser and push enter
 2. In Rodin.space click Login
 3. Fill Correct Username (mhers) and Password (a123456) and click ""Sign in"" or Enter button
 Validate Part:
 1. Check URL is (https://rodin.space/dashboard)
 2. Check username is written in right part of the header
 3. Check there is no errors in console"
 */

describe('Login.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });


    it('Login_with_not_existing_cridentals.tc', () => {
        Login.isDisplayed();
        Login.processLogin(common.TESTUSERS[2].username, common.TESTUSERS[2].password);
    });

    it('Login_with_existing_cridentals.tc', () => {
        Login.isDisplayed();
        Login.processLogin(common.TESTUSERS[0].username, common.TESTUSERS[0].password, true);
    });

});