/**
 * Created by mhers on 6/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');

const objMap = require('../components/objectMap');

/**
Run Part:
 Login with existing user
 Go to dashboard
 Create any project
 Write project name/url string in Search field
 Click Enter or Search button
Validate Part:
 Check search has given back searched project

 */

describe('BugRelated.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });

    it('RO-567.tc', () => {
        // Code should be here

        project_name = common.PROJECTS.Name;
        project_url = common.PROJECTS.URL;

        globalFunc.add_project();
        globalFunc.isDisplayed_Project_Fields();
        globalFunc.process_fill_project_requred_fields(
            common.TEMPLATES.VideoGallery.name,
            project_name,
            project_url,
            common.PROJECTS.Description, true
        );

        globalFunc.searchProject(project_name);

    });
});