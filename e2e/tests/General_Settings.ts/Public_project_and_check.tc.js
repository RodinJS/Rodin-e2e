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


describe('General_Settings.ts', () => {
    beforeEach(() => {
        common.goToUrl('login');
    });

    user = common.TESTUSERS[1].username;
    password = common.TESTUSERS[1].password;


    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(user, password, true);
    });

    template_name = common.TEMPLATENAMES[1];
    project_name = common.TESTPROJECTS[0].ProjectName;
    project_url = common.TESTPROJECTS[0].ProjectURL;
    project_description = common.TESTPROJECTS[0].ProjectDescription;

    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.add_project();
        globalFunc.isDisplayed_Project_Fields();
        globalFunc.process_fill_project_requred_fields(template_name, project_name, project_url, project_description, true);
    });

    it('Public_project_and_check.tc', () => {
        globalFunc.open_project_settings(project_name);
        globalFunc.publicProject(user, project_url);
        globalFunc.openPublicProject(user, project_url);
    });

    it('Cleanup.tc', () => 
    {
        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
        
    });

});