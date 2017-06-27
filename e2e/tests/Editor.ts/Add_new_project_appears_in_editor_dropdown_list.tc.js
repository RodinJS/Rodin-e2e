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

    // template_name = common.TEMPLATENAMES[1];
    // project_name = common.TESTPROJECTS[0].ProjectName;
    // project_url = common.TESTPROJECTS[0].ProjectURL;
    // project_description = common.TESTPROJECTS[0].ProjectDescription;


    // it('Create_project_with_unique_URL.tc', () => {
    //     globalFunc.add_project();
    //     globalFunc.isDisplayed_Project_Fields();
    //     globalFunc.process_fill_project_requred_fields(template_name, project_name, project_url, project_description, true);
    // });

    // Fixed Project to save time
    let project_name = "name6155421";
    let project_url = "url6155421";

    it('Add_new_project_appears_in_editor_dropdown_list.tc', () => {

        globalFunc.open_project_in_editor(user, project_name, project_url);
        //
        // globalFunc.open_project_settings(project_name);
        // globalFunc.publicProject(user, project_url);
        // globalFunc.UnPublicProject(user, project_url);
        // globalFunc.openUnPublicProject(user, project_url);
    });

});