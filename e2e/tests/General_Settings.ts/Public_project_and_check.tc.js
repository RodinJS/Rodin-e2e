/**
 * Created by mhers on 4/13/17.
 */

const common = require('../utils/common');
const Login = require('../components/login');


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

describe('Dashboard.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    user = common.TESTUSERS[1].username;
    password = common.TESTUSERS[1].password;


    it('Login_with_existing_cridentals.tc', () => {
        Login.isDisplayed_Login_Fields();
        Login.processLogin(user, password, true);
    });

    template_name = common.TEMPLATENAMES[1];
    project_name = common.TESTPROJECTS[0].ProjectName;
    project_url = common.TESTPROJECTS[0].ProjectURL;
    project_description = common.TESTPROJECTS[0].ProjectDescription;

    it('Create_project_with_unique_URL.tc', () => {
        Login.add_project();
        Login.isDisplayed_Project_Fields();
        Login.process_fill_project_requred_fields(template_name, project_name, project_url, project_description, true);
    });

    it('Public_project_and_check.tc', () => {
        Login.open_project_settings(project_name);
        Login.publicProject(user, project_url);
    });

});