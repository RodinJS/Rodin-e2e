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

    it('Change_project_name_and_description.tc', () => {

        // create a new project with unique URL 
        globalFunc.open_project_settings("AbC123");

        objMap.projectNameInputInSettings.clear();
        objMap.projectNameInputInSettings.sendKeys('Renamed Project').then(()=>{
            element(by.buttonText('Update')).click();
            expect(objMap.notificationsArray.count()).toBe(1);
            expect(objMap.notificationsArray.get(0).getText()).toBe('Project updated');
            browser.refresh();
            objMap.projectNameInputInSettings.getText((text)=> expect(text).toEqual('Renamed Project'));
        });

        objMap.projectDescInputInSettings.clear();
        objMap.projectDescInputInSettings.sendKeys('Description is renamed!').then(()=>{
            element(by.buttonText('Update')).click();
            expect(objMap.notificationsArray.count()).toBe(1);
            expect(objMap.notificationsArray.get(0).getText()).toBe('Project updated');
            browser.refresh();
            objMap.projectDescInputInSettings.getText((text)=> expect(text).toEqual('Description is renamed!'));
        });

    });
    
    it('Cleanup.tc', () => 
    {
		  globalFunc.delete_project("Renamed Project",true);
        
    });

});