/**
 * Created by melkabelka on 7/6/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const iOSCommon = require('../iOSBuild.ts/iOSCommon');
const EC = protractor.ExpectedConditions;

// resource files
let mobile_prov = __dirname + "\\resources\\12d2bac8-68cd-432c-969d-7f7c56caf5ca.mobileprovision";
let cert = __dirname + "\\resources\\Cert.p12";
let icon = __dirname + "\\resources\\uxtaxchik.png";

describe('iOSBuild.ts', () => {

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

    	// create a new project for iOS Build   	
    	globalFunc.createProject("Interior", 'iOSProj', 'iosurl','ios project description', "", true);

    });

    it('Spaces_as_Version.tc', () => {

		// go to created iOSProj project's settings
        globalFunc.open_project_settings("iOSProj");

        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp", "1.1.1", "com.rodin.test", "  ", mobile_prov, cert, icon);
        
        let error = iOSCommon.developerId.element(by.xpath("../div[@class='validation error ng-scope']"));

        // checking that error appeared during field validation
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Developer ID is required");
           });

        });

        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();

        // checking that error appeared that application developer ID is not specified
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Developer ID is required");
           });

        });

    });

    it('Cleanup.tc', () => {
    	//go to Dashboard
    	element(by.linkText('Dashboard')).click().then(() => {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});

        globalFunc.delete_project("iOSProj",true);

    });

});