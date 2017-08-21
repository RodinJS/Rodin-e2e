/**
 * Created by mhers on 5/11/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');

/**
Run Part:
1. Open project in editor
2. Read project url from dropdown list from top-left of the screen
Validate Part:
1. Check dropdown list contains new created project url
2. Check there is no errors in console
*/

describe('Editor.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });

    user_name = common.USERS.MherS.username;
    url = common.CONSTANTS.spaceURL;
    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;
    project_template = 'Basic';

    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject(project_template, project_name, project_url, project_description, "", false);
    });

    it('Add_new_project_appears_in_editor_dropdown_list.tc', () => {
        globalFunc.open_project_in_editor(user_name, project_name, project_url);
        browser.driver.sleep(3000);
        browser.ignoreSynchronization = false;
        common.goToUrl('login');
        browser.driver.sleep(3000);
    });

});