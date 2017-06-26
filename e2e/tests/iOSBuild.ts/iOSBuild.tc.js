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
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
	
    it('Create_project_with_unique_URL.tc', () => {

    	// create a new project for iOS Build   	
    	globalFunc.createProject('Basic', 'iOSProj1', 'iosurl1','ios project 1 description');

    	// create a new project for iOS Build   	
    	globalFunc.createProject("Drag'n'Drop", 'iOSProj2', 'iosurl2','ios project 2 description');

    });

    it('iOS_publish_before_and_build.tc', () => {

        // go to created project settings
    	//globalFunc.open_project_settings('iOSProj1');
    	// index starts with 2
    	globalFunc.open_project_settings_byIndex(3);
        
        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp", "1.1.1", "com.testiOS.io", "TestDev", mobile_prov, cert, icon);
        
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
        this.publishURL = element(by.linkText("https://rodin.space/"+common.TESTUSERS[3].username+"/iosurl1"));

     	// change focus on new opened tab
     	this.publishURL.click();
     	globalFunc.browserTabChange(1);

        // wait for VR object load : currently explicit wait is here but will be removed in future
    	browser.sleep(8000);
        
        // take a screenshot		
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL1_1.png');
		});

        // go back to the main tab
		globalFunc.browserTabChange(0);

        // take a screenshot
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL1_2.png');
		});

        // click on iOS tab
        objMap.iosTab.click();

        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp1", "1.1.1", "com.testiOS1.io", "TestDev1", mobile_prov, cert, icon);
        
        // click on build button
        this.submitBtn.click();
        
        // specify certificate password
        this.certPassword = element(by.model("$ctrl.project.ios.certPassword")).sendKeys("123123");
        
        // click on Submit button
        this.submitCertPass = element(by.css('[data-ng-click="$ctrl.build($event)"]')).click();
 
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 15000);
        
        // download build
        objMap.downloadBuild.click(); 
        
        // wait for download build to appear
       browser.sleep(8000);
    });

    it('iOS_publish_and_build.tc', () => {
        //globalFunc.open_project_settings('iOSProj2');
        element(by.linkText('Dashboard')).click();

		// go to created iOSProj2 project's settings
        globalFunc.open_project_settings_byIndex(2);

        // click on iOS tab
        objMap.iosTab.click();
        
        // fill all iOS fields
        iOSCommon.iOSFieldsFill("iOSApp2", "1.1.1", "com.testiOS2.io", "TestDev2", mobile_prov, cert, icon);
        
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
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 15000);
        
        // download build
        objMap.downloadBuild.click(); 
        
        // wait for download build to appear
        browser.sleep(8000);
        
        // go to publish section
        objMap.publishTab.click();

        // click on publish: URL SHOULD BE CHANGED TO TEST ACCOUNT
        this.publishURL = element(by.linkText("https://rodin.space/"+common.TESTUSERS[3].username+"/iosurl2"));

        // change focus on new opened tab
        this.publishURL.click();
        globalFunc.browserTabChange(2);

        // wait for VR object load : currently explicit wait is here but will be removed in future
        browser.sleep(8000);
        
        // take a screenshot        
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL2_1.png');
        });

        // go back to the main tab
        globalFunc.browserTabChange(0);

        // take a screenshot
        browser.takeScreenshot().then((png) => {
            globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL2_2.png');
        });

    });

});