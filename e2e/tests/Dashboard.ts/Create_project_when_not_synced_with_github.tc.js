/**
 * Created by melkabelka on 7/4/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;

describe('Dashboard.ts', () => {

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