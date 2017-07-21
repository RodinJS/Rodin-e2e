/**
 * Created by melkabelka on 7/17/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const viveCommon = require('../ViveBuild.ts/viveCommon');
const EC = protractor.ExpectedConditions;


describe('ViveBuild.ts', () => {

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

        // create a new project for vive Build       
        globalFunc.createProject("Interior", 'viveProj', 'viveurl','vive project description', "", true);

    });

    it('vivePublishAndBuild.tc', () => {
     
        // go to created viveProj project's settings
        globalFunc.open_project_settings("viveProj");

        // click on vive tab
        objMap.viveTab.click();
        
        // fill all vive fields
        viveCommon.viveFieldsFill("viveApp", "1.1.1");
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        
        // click on publish button from publish&build dialog
        this.publishandbuild = element(by.css('[ng-click="$ctrl.publishNbuild($event)"]')).click();

        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 300000);
        
        // download build
        objMap.downloadBuild.click(); 
        
        // wait for download build to appear
        browser.sleep(15000);
        
        // go to publish section
        objMap.publishTab.click();

        // click on publish: URL SHOULD BE CHANGED TO TEST ACCOUNT
        this.publishURL = element(by.linkText("https://rodin.space/"+common.TESTUSERS[3].username+"/viveurl"));

        // change focus on new opened tab
        this.publishURL.click();
        globalFunc.browserTabChange(1);

        // wait for VR object load : currently explicit wait is here but will be removed in future
        browser.sleep(8000);
        
        // take a screenshot        
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, './screenshots/viveAppProjURL2_1.png');
        });

        // go back to the main tab
        globalFunc.browserTabChange(0);

        // take a screenshot
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, './screenshots/viveAppProjURL2_2.png');
        });

    });


    it('Cleanup.tc', () => {
        //go to Dashboard
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        globalFunc.delete_project("viveProj",true);

    });

});