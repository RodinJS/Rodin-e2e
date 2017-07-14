/**
 * Created by melkabelka on 7/14/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const oculusCommon = require('../OculusBuild.ts/oculusCommon');
const EC = protractor.ExpectedConditions;


describe('OculusBuild.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        // Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
    
    it('Create_project_with_unique_URL.tc', () => {

        // create a new project for oculus Build       
        globalFunc.createProject("Interior", 'oculusProj', 'oculusurl','oculus project description', "", true);

    });

    it('spacesAsVersion.tc', () => {

        // go to created oculusProj project's settings
        globalFunc.open_project_settings("oculusProj");

        // click on oculus tab
        objMap.oculusTab.click();
        
        // fill all oculus fields
        oculusCommon.oculusFieldsFill("TestApp", "   ");
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        let error = oculusCommon.oculusVersion.element(by.xpath("../div[@class='validation error ng-scope']"));

        // checking that error appeared that application name is not specified
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Version is required");
           });

       });

    });

    it('Cleanup.tc', () => {
        //go to Dashboard
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        globalFunc.delete_project("oculusProj",true);

    }); 

});