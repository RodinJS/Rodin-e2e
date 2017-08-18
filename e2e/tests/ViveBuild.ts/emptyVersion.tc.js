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

    it('Login_with_existing_cridentals.tc', () => {
        // Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
    
    it('Create_project_with_unique_URL.tc', () => {

        // create a new project for vive Build       
        globalFunc.createProject("Interior", 'viveProj', 'viveurl','vive project description', "", true);

    });

    it('emptyVersion.tc', () => {

        // go to created viveProj project's settings
        globalFunc.open_project_settings("viveProj");

        // click on vive tab
        objMap.viveTab.click();
        
        // fill all vive fields
        viveCommon.viveFieldsFill("TestApp", "");
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        let error = viveCommon.viveVersion.element(by.xpath("../div[@class='validation error ng-scope']"));

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

        globalFunc.delete_project("viveProj",true);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

    });

});