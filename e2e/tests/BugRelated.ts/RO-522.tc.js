/**
 * Created by mhers on 6/9/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');



/**

 Run Part:
 1. Login to rodin.space
 2. Create any project
 3. Open project settings
 4. Click on Thumbnail and choose (image file more then supported size (now 5Mb))
 5. Check message
 Validate Part:
 1. Red popup Message should be: "File size must be less than 5mb".
 2. Check there is no errors in console"

 TODO following test cases should be added in regression later!
 Other Negative and positive test cases related to this bug:
 2. Upload BMP and check message it should be "Allowed only .jpg .jpeg and .png file types."
 3. Upload GIF and check message it should be "Allowed only .jpg .jpeg and .png file types."
 4. Upload JPG and check message it should open window saying save or cancel
 5. Upload JPEG and check message it should open window saying save or cancel
 6. Upload PNG and check message it should open window saying save or cancel

 */

describe('BugRelated.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        // globalFunc.processLogin(common.TESTUSERS[4].username, common.TESTUSERS[4].password, true);
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });
	
    template_name = common.TEMPLATENAMES[1];
    project_name = common.TESTPROJECTS[0].ProjectName;
    project_url = common.TESTPROJECTS[0].ProjectURL;
    project_description = common.TESTPROJECTS[0].ProjectDescription;

    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject('Video Gallery', project_name, project_url, project_description,"",true);
    });

    it('RO-522.tc', () => {
        globalFunc.open_project_settings(project_name);
        globalFunc.uploadWrongSizeImage();
    });
});