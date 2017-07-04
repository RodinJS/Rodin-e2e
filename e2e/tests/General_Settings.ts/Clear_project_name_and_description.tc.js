/**
 * Created by melkabelka on 7/4/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;

describe('General_Settings.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[6].username, common.TESTUSERS[6].password, true);
    });
	
    it('Create_project_with_unique_URL.tc', () => {

        // create a new project with unique URL	
    	globalFunc.createProject('Basic', 'AbC123', '123url','project description', "", false);  

    });

    it('Clear_project_name_and_description.tc', () => {

        // create a new project with unique URL 
        globalFunc.open_project_settings("AbC123");

        objMap.projectNameInputInSettings.clear();
        objMap.projectNameInputInSettings.sendKeys(' ').then(()=>{
            //element(by.buttonText('Update')).click();

            let error = objMap.projectNameInputInSettings.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

            browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
            {
                error.getText().then(function(text)
               {
                   expect(text).toBe("Project name must contain at least 3 characters");
               });

           });
        });

        objMap.projectDescInputInSettings.clear();
        objMap.projectDescInputInSettings.sendKeys(' ').then(()=>{
            //element(by.buttonText('Update')).click();

            let error = objMap.projectDescInputInSettings.element(by.xpath("../div[@class='validation error ng-scope']"));

            browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
            {
                error.getText().then(function(text)
               {
                   expect(text).toBe("Description is required");
               });

           });
        });


    });
    
    it('Cleanup.tc', () => 
    {
		  globalFunc.delete_project("AbC123",true);
        
    });

});