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

    it('Spaces_as_display_name.tc', () => {

        // go to created oculusProj project's settings
        globalFunc.open_project_settings("oculusProj");

        // click on oculus tab
        objMap.oculusTab.click();
        
        // fill all oculus fields
        oculusCommon.oculusFieldsFill("  ", "1.1.1");
        
        let error = oculusCommon.oculusAppName.element(by.xpath("../div[@class='validation error ng-scope']"));

        // checking that error appeared during field validation
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("App name is required");
           });

        });

        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();

        // checking that error appeared that application name is not specified
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("App name is required");
           });

        });

    });

    it('Cleanup.tc', () => {

        globalFunc.delete_project("oculusProj",true);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

    });

});