/**
 * Created by melkabelka on 4/13/17.
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
    	globalFunc.createProject('Basic', 'iOSProj', 'iosurl','ios project description', "", true);

    });

    it('iOS_cancel_publish_before_build.tc', () => {

        // go to created project settings
    	globalFunc.open_project_settings("iOSProj");
        
        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp", "1.1.1", "com.testiOS.io", "TestDev", mobile_prov, cert, icon);
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        
        // click on cancel button from publish&build dialog
        this.cancelBtn = element(by.className("btn btn-cancel")).click();

        // check that publish&build dialog is closed
        expect(objMap.publishDialog.isDisplayed()).toBe(false);

        browser.wait(EC.invisibilityOf(objMap.publishDialog), 15000);
        
    });


    it('Cleanup.tc', () => {
    	//go to Dashboard
    	element(by.linkText('Dashboard')).click().then(() => {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});

        globalFunc.delete_project("iOSProj",true);

    });

});