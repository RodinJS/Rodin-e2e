/**
 * Created by xgharibyan on 3/23/17.
 * Updated by melkabelka on 9/27/2017.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');

describe('Login.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_not_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[2].username, common.TESTUSERS[2].password, false);
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[7].username, common.TESTUSERS[7].password, true);
    });

    it('Cleanup', () => {
        // sign out
        globalFunc.signOut();
    });

});