/**
 * Created by melkabelka on 4/13/17.
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

    it('androidCancelPublishBeforeBuild.tc', () => {

        // go to created project settings
    	globalFunc.open_project_settings("AndroidProj");
        
        // click on Android tab
        objMap.androidTab.click();
        
        // fill all android fields
        AndroidCommon.AndroidFieldsFill("AndroidApp1", "1.1.1", "com.testAndroid.io","TestName","TestAlias", icon);
        
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
        // delete Android Project
        globalFunc.delete_project("AndroidProj",true);

    });

});