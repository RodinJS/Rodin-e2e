/**
 * Created by melkabelka on 7/12/17.
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


    it('iOS_publish_and_build.tc', () => {

		// go to created iOSProj2 project's settings
        globalFunc.open_project_settings("iOSProj");

        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp", "1.1.1", "com.testiOS.io", "TestDev", mobile_prov, cert, icon);
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        
        // click on publish button from publish&build dialog
        this.publishandbuild = element(by.css('[ng-click="$ctrl.publishNbuild($event)"]')).click();

        // specify certificate password
        this.certPassword = element(by.model("$ctrl.project.ios.certPassword")).sendKeys("123123");
        
        // click on Submit button
        this.submitCertPass = element(by.css('[data-ng-click="$ctrl.build($event)"]')).click();
 
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 300000);
        
    });

    it('versionLowerThanBuiltVersion.tc', () => {

        // go to created iOSProj2 project's settings
        globalFunc.open_project_settings("iOSProj");

        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSAppUpdate", "1.1.1", "com.testUpdate.io", "TestUpdate", mobile_prov, cert, icon);

        let error = iOSCommon.iOSVersion.element(by.xpath("../div[@class='validation error ng-scope']")); 

        // checking that error appeared that application version is lower than current version
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Version must be higher than current. Current version is 1.1.1");
           });
       });
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(element(by.model("$ctrl.project.ios.certPassword")).isDisplayed()).toBe(false);
         
    });

    it('Cleanup.tc', () => {
    	//go to Dashboard
    	element(by.linkText('Dashboard')).click().then(() => {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});

        globalFunc.delete_project("iOSProj",true);

    });

});