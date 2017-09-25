/**
 * Created by melkabelka on 4/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const androidCommon = require('../AndroidBuild.ts/AndroidCommon');
const EC = protractor.ExpectedConditions;

// resource files
let icon = __dirname + "\\resources\\uxtaxchik.png";

describe('AndroidBuild.ts', () => {

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

    	// create a new project for Android Build   	
    	globalFunc.createProject('Interior', 'AndroidProj1', 'Androidurl1','Android project 1 description', "", true);

    });

    it('Android_publish_before_and_build.tc', () => {

        // go to created project settings
    	globalFunc.open_project_settings("AndroidProj1");
        
        // click on android tab
        objMap.androidTab.click();
        
        // fill all iOS fields
        androidCommon.AndroidFieldsFill("AndroidApp", "1.1.1", "com.testAndroid.io","TestName","TestAlias", icon);
        
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
        this.publishURL = element(by.linkText("https://rodin.space/"+common.TESTUSERS[3].username+"/androidurl1"));

     	// change focus on new opened tab
     	this.publishURL.click();
     	globalFunc.browserTabChange(1);

        // wait for VR object load : currently explicit wait is here but will be removed in future
    	browser.sleep(8000);
        
        // take a screenshot		
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/androidAppProjURL1_1.png');
		});

        // go back to the main tab
		globalFunc.browserTabChange(0);

        // take a screenshot
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/androidAppProjURL1_2.png');
		});

        // click on android tab
        objMap.androidTab.click();
        
        // fill all iOS fields
        androidCommon.AndroidFieldsFill("AndroidApp", "1.1.1", "com.testAndroid.io","TestName","TestAlias", icon);
        
        // click on build button
        this.submitBtn.click();
        
        // specify certificate password
        this.keyStorePassword = element(by.model("$ctrl.project.android.keyStore.password")).sendKeys("123123");
        
        // specify alis password
        this.aliasPassword = element(by.model("$ctrl.project.android.keyStore.aliasPassword")).sendKeys("654654");
        
        // click on Submit button
        this.submitPassword = element(by.css('[ng-click="$ctrl.build($event)"]')).click();
 
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 300000);
        
        // download build
        objMap.downloadBuild.click(); 
        
        // wait for download build to appear
        browser.sleep(8000);
    });

    it('Cleanup.tc', () => {

        globalFunc.delete_project("AndroidProj1",true);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

    });

});