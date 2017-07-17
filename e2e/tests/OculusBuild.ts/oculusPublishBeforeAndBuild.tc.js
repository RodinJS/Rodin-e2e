/**
 * Created by melkabelka on 7/17/17.
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

    it('oculusPublishBeforeAndBuild.tc', () => {

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
        
        // click on publish button from publish&build dialog
        this.publish = element(by.css('[ng-click="$ctrl.gotToPublish()"]')).click();
        
        // check that Publish button from publish section is accessable and click on it
        this.publishBtn = element(by.buttonText("Publish"));
        expect(this.publishBtn.isDisplayed()).toBe(true);
        this.publishBtn.click();
        
        // click on publish: URL SHOULD BE CHANGED TO TEST ACCOUNT
        this.publishURL = element(by.linkText("https://rodin.space/"+common.TESTUSERS[3].username+"/oculusurl"));

        // change focus on new opened tab
        this.publishURL.click();
        globalFunc.browserTabChange(1);

        // wait for VR object load : currently explicit wait is here but will be removed in future
        browser.sleep(8000);
        
        // take a screenshot        
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, 'screenshots/oculusAppProjURL1_1.png');
        });

        // go back to the main tab
        globalFunc.browserTabChange(0);

        // take a screenshot
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, 'screenshots/oculusAppProjURL1_2.png');
        });

        // click on oculus tab
        objMap.oculusTab.click();
        
        // fill all oculus fields
        oculusCommon.oculusFieldsFill("oculusApp", "1.1.1");
        
        // click on build button
        this.submitBtn.click();
        
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 300000);
        
        // download build
        objMap.downloadBuild.click(); 
        
        // wait for download build to appear
        browser.sleep(15000);
    });

    it('Cleanup.tc', () => {
        //go to Dashboard
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        globalFunc.delete_project("oculusProj",true);

    });

});