/**
 * Created by mhers on 5/11/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');

/**
Run Part:
1. Open project in editor
2. Click on project dropdown list from top-left of the screen
Validate Part:
1. Check dropdown list contains new created project url
2. Check there is no errors in console
*/

describe('Editor.ts', () => {
    beforeEach(() => {
        common.goToUrl('login');
    });

    user = common.TESTUSERS[1].username;
    password = common.TESTUSERS[1].password;

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(user, password, true);
    });

    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;

    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject('Video Gallery', project_name, project_url, project_description);
    });

    it('Add_new_project_appears_in_editor_dropdown_list.tc', () => {
        // TODO this part is not working due to protractor issue: look in globalFunc lib
        globalFunc.open_project_in_editor(user, project_name, project_url);
    });

});