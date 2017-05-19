/**
 * Created by mhers on 4/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');


/**
Run Part:
1. User is in Dashboard
2. Open any project settings
3. Public Project
4. Click on "Current version:" URL
Validate Part:
1. Check "Current version:" URL contains doamin\public\username\project_url_name\?t=(13 length number)
2. Check "Current version:" URL opened successfully
3. Check there is no errors in console
*/


describe('EditProfile.ts', () => {
    beforeEach(() => {
        common.goToUrl('login');
    });

    user = common.TESTUSERS[1].username;
    password = common.TESTUSERS[1].password;

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(user, password, true);
    });

    it('Sync_with_google.tc', () => {
        globalFunc.openEditProfile();
        globalFunc.syncWithGoogle();
    });

});