/**
 * Created by melkabelka on 7/6/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const androidCommon = require('../AndroidBuild.ts/androidCommon');
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

    	// create a new project for android Build   	
    	globalFunc.createProject("Drag'n'Drop", 'androidProj', 'androidurl','android project description', "", true);

    });

    it('Invalid_form_of_version.tc', () => {

		// go to created androidProj project's settings
        globalFunc.open_project_settings("androidProj");

        // click on android tab
        objMap.androidTab.click();
        
        // fill all android fields
        androidCommon.AndroidFieldsFill("TestApp", "1.0", "com.testandroid.io", "TestName", "TestAlias", icon); 

        let error = androidCommon.AndroidVersion.element(by.xpath("../div[@class='validation error ng-scope']"));

        // checking that error appeared during field validation
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Version must be in #.#.# format");
           });

        });

        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();

        // checking that error appeared that application version is invalid
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Version must be in #.#.# format");
           });

        });

    });

    it('Cleanup.tc', () => {
    	//go to Dashboard
    	element(by.linkText('Dashboard')).click().then(() => {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});

        globalFunc.delete_project("androidProj",true);

    });

});