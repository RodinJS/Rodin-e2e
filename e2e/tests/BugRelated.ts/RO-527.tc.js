/**
 * Created by mhers on 6/28/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');


/**
Run Part:
1. User is in Dashboard
2. Open Project Settings
3. Click sync with github
4. Click Ctrl+F5 (Refresh)
Validate Part:
1. Check Account is synced with github
2. Check there is no errors in console
*/


describe('EditProfile.ts', () => {
    beforeEach(() => {
        common.goToUrl('login');
    });

    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });

    it('Sync_with_google.tc', function(done){
        globalFunc.openEditProfile();
        // console.log("1. before syncWithGoogle");
        globalFunc.syncWithGoogle();
        // console.log("6. after syncWithGoogle");
        console.log(protractor.promise.controlFlow().getSchedule(false));
        done()
    });
});