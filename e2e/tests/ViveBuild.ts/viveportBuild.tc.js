/**
 * Created by melkabelka on 7/14/17.
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

    it('loginWithExistingCridentals.tc', () => {
        // Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
    
    it('createProjectWithUniqueURL.tc', () => {

        // create a new project for vive Build       
        globalFunc.createProject("Basic", 'viveProj', 'viveurl','vive project description', "", true);

    });

    it('viveportBuild.tc', () => {
        
        // go to created viveProj project's settings
        globalFunc.open_project_settings("viveProj");

        // click on vive tab
        objMap.viveTab.click();

        // swipe viveport trigger
        viveCommon.viveTrigger.click();

        // wait visibility of viveportID
        expect(browser.wait(EC.visibilityOf(viveCommon.viveportID), 5000)).toBe(true);

        // wait visibility of viveportKey
        expect(browser.wait(EC.visibilityOf(viveCommon.viveportKey), 5000)).toBe(true);

        // fill all vive fields
        viveCommon.viveFieldsFill("AppTest", "1.1.1", true, 'ID', "Key");
        
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

    });

    it('Cleanup.tc', () => {
        //go to Dashboard
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        globalFunc.delete_project("viveProj",true);

    });

});