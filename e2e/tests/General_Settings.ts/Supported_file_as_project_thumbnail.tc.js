/**
 * Created by melkabelka on 7/4/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const cmd = require('node-cmd');

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

    it('Supported_file_as_project_thumbnail.tc', () => {

        // open project with name
        globalFunc.open_project_settings("AbC123");

        let tempElem = element(by.className('drag-area first'));
        browser.wait(EC.visibilityOf(tempElem), 15000, "Wait for thumbnail field");
        browser.actions().mouseMove(tempElem).perform();
        tempElem.click().then(()=>{
            let par= __dirname + '\\resources';
            let tempPath = par+ '\\chooseFile.au3 '+ par+'\\Desert-puzzle.jpg';
            cmd.run(tempPath);    
        }).then(()=> {
            let saveBtn = element(by.buttonText('Save'));
            browser.wait(EC.visibilityOf(saveBtn), 15000,'Wait for Save element to appear');
            saveBtn.click();
            element(by.buttonText('Update')).click();
            expect(objMap.notificationsArray.count()).toBe(1);
            expect(objMap.notificationsArray.get(0).getText()).toBe('Project updated');
        });
    });
    
    it('Cleanup.tc', () => 
    {
		globalFunc.delete_project("AbC123",true);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();
        
    });

});