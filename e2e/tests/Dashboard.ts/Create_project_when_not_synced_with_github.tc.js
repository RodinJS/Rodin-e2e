/**
 * Created by melkabelka on 7/4/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');

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
        
    });

});