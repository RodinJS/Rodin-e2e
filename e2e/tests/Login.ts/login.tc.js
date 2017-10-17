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

    it('loginWithNonExistingCredentials.tc', () => {
        globalFunc.isLoginFormDisplayed();
        globalFunc.processLogin(common.TESTUSERS[1].username, common.TESTUSERS[1].password, false);
    });

    it('loginWithExistingCredentials.tc', () => {
        globalFunc.isLoginFormDisplayed();
        globalFunc.processLogin(common.TESTUSERS[0].username, common.TESTUSERS[0].password, true);
    });

    it('Cleanup', () => {
        // sign out
        globalFunc.signOut();
    });

});