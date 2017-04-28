/**
 * Created by mhers on 4/13/17.
 */

const common = require('../utils/common');
const Login = require('../components/login');


/**
Run Part:
1. Click "Create new Project" link or "+" button
2. Choose any template
3. Fill project name, Project unique URL, Description
4. Click Save and get started
Validate Part:
1. Check user is in dashboard: URL is (https://rodin.space/Dashboard)
2. Check Project with created name appears in Dashboard
3. Check there is no errors in console
 */

describe('Dashboard.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        Login.isDisplayed_Login_Fields();
        Login.processLogin(common.TESTUSERS[1].username, common.TESTUSERS[1].password, true);
    });
	
    it('Create_project_with_unique_URL.tc', () => {
        Login.add_project();
        Login.isDisplayed_Project_Fields();
        Login.process_fill_project_requred_fields(common.TESTPROJECTS[0].ProjectName, common.TESTPROJECTS[0].ProjectURL, common.TESTPROJECTS[0].ProjectDescription, true);
    });

});