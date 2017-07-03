/**
 * Created by melkabelka on 7/4/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;

describe('Dashboard.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });

    xit('Create_project_with_invalid_gitHub_url.tc', () => 
    {     
        // create a new project with spaces in url.
        objMap.add_icon.click();  

        let giturl = "https://github.com/melkabelka/Rodin-Samples.git#prod";
        // fill project creation fields
        globalFunc.fillProjectRequiredFields('Pull From GitHub', 'GitHubProject', 'GitHubProjUrl','This project is pulled from github', giturl, true);

         // click on Save and Get Started
        objMap.save_and_get_started_button.click()
        expect(objMap.notificationsArray.count()).toBe(1);
        // this part should be clarified
        // expect(objMap.notificationsArray.get(0).getText()).toBe('GitHub project does not exist!');
    });

});