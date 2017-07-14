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

    it('oculusCancelPublishBeforeBuild.tc', () => {

        // go to created project settings
        globalFunc.open_project_settings("oculusProj");
        
        // click on oculus tab
        objMap.oculusTab.click();
        
        // fill all oculus fields
        oculusCommon.oculusFieldsFill("oculusApp", "1.1.1");
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        
        // click on cancel button from publish&build dialog
        this.cancel = element(by.css('[data-ng-click="$ctrl.modals.notPublished = false"]')).click();
        
        // check that dialog is closed and build process is not started.
        browser.wait(EC.invisibilityOf(objMap.downloadBuild), 15000);
        expect(objMap.publishDialog.isDisplayed()).toBe(false);
        
    });

    it('Cleanup.tc', () => {
        //go to Dashboard
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        globalFunc.delete_project("oculusProj",true);

    });

});