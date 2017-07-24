/**
 * Created by melkabelka on 7/12/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const AndroidCommon = require('../AndroidBuild.ts/AndroidCommon');
const EC = protractor.ExpectedConditions;

// resource file
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
    	globalFunc.createProject('Basic', 'AndroidProj', 'Androidurl','Android project description', "", true);

    });


    it('androidPublishAndBuild.tc', () => {

		// go to created AndroidProj2 project's settings
        globalFunc.open_project_settings("AndroidProj");

        // click on Android tab
        objMap.androidTab.click();
        
        // fill all android fields
        AndroidCommon.AndroidFieldsFill("AndroidApp", "1.1.1", "com.testAndroid.io","TestName","TestAlias", icon);
        
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        
        // click on publish button from publish&build dialog
        this.publishandbuild = element(by.css('[ng-click="$ctrl.publishNbuild($event)"]')).click();

        // specify certificate password
        this.keyStorePassword = element(by.model("$ctrl.project.android.keyStore.password")).sendKeys("123123");
        
        // specify alis password
        this.aliasPassword = element(by.model("$ctrl.project.android.keyStore.aliasPassword")).sendKeys("654654");
        
        // click on Submit button
        this.submitPassword = element(by.css('[ng-click="$ctrl.build($event)"]')).click();
 
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 300000);
        
    });

    it('versionLowerThanBuiltVersion.tc', () => {

        // go to created AndroidProj2 project's settings
        globalFunc.open_project_settings("AndroidProj");

        // click on Android tab
        objMap.androidTab.click();
        
        // fill all android fields
        AndroidCommon.AndroidFieldsFill("AndroidApp", "1.1.1", "com.testAndroid.io","TestName","TestAlias", icon);

        let error = AndroidCommon.AndroidVersion.element(by.xpath("../div[@class='validation error ng-binding ng-scope']")); 

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
        expect(element(by.model("$ctrl.project.android.keyStore.password")).isDisplayed()).toBe(false);
         
    });

    it('Cleanup.tc', () => {
    	// delete project
        globalFunc.delete_project("AndroidProj",true);

    });

});