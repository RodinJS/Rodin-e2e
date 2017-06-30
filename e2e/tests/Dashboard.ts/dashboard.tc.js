/**
 * Created by mhers on 4/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;

describe('Dashboard.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
        browser.driver.manage().window().maximize();
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
	
    it('Create_project_with_unique_URL.tc', () => {

        // create a new project with unique URL	
    	globalFunc.createProject('Basic', 'AbC123', '123url','project description', "", true);  

    });

    it('Create_project_with_only_numbers_in_url.tc', () => {
       
       // create a new project with only numbers in url  	
        globalFunc.createProject('Blank', 'NumbersInURL', '111','This project has only numbers in url', "", true);

    });

    it('Create_project_with_only_symbols_in_url.tc', () => {
       
       // create a new project with only numbers in url  	
        globalFunc.createProject('Blank', 'SymbolsInURL', 'abc','This project has only symbols in url', "", true);

    });

    it('Create_project_with_max_limits.tc', () => {
       
       // create a new project with max limits in input fields.	
        globalFunc.createProject('Blank', 'Project is with max symbols in all input fields, i.e 64, 16, 128', 'abcdefgh12345678',"Projects all input fields are with maximum symbols count. Project name has 64 symbols, project url 16,  project description 128.", "", true);

    });

    xit('Create_project_with_max_plus1_limits.tc', () => {
       
       // create a new project with max limits in input fields.	
        globalFunc.createProject('Blank', 'Project is with max+1 symbols in all input fields,i.e 65, 17,129!', 'abcdefgh123456789',"User specified max+1 symbols count in all input fields. So project name has 65 symbols, project url 17, project description 129.!", "", true);

        // TODO
        // check that you are able to go to project settings with name and url,description symbols count is also correct.
 
        //globalFunc.open_project_settings("Project is with max+1 symbols in all input fields,i.e 65, 17,129");
  
    });

    it('Create_project_with_min_minus1_name_limit.tc', () => {
       
       // create a new project with min -1 limit symbols in name input field.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'A1', 'A1url',"User should not be able to create project with name min limit-1 symbols", "", true);

        let error = objMap.Project_Name_Field.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project name must contain at least 3 characters");
           });

       });

       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

       // checking that project is not created with error.
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project name must contain at least 3 characters");
           });

       });

    });

    it('Create_project_with_spaces_in_url.tc', () => {

    	element(by.linkText('Dashboard')).click().then(() => {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});
       
       // create a new project with spaces in url.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'TestInvalid', 'A1 url',"User should not be able to create project with spaces in url", "", true);

        let error = objMap.project_URL.element(by.xpath("../../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

       // checking that project is not created with error.
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

    });

    it('Create_project_with_min_minus1_url_limit.tc', () => {
       
       // create a new project with min -1 limit symbols in name input field.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'TestInvalidURL', 'ur',"User should not be able to create project with url min limit-1 symbols", "", true);

        let error = objMap.project_URL.element(by.xpath("../../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

       // checking that project is not created with error.
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

    });

    xit('Create_project_with_special_symbols_in_url.tc', () => {
       
       // create a new project with min -1 limit symbols in name input field.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'TestURL', '#$!',"User should not be able to create project with url min limit-1 symbols", "", true);

        let error = objMap.project_URL.element(by.xpath("../../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

       // checking that project is not created with error.
        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Project URL must be alphanumeric with no spaces and at least 3 characters");
           });

       });

    });

    it('Create_project_with_empty_description.tc', () => 
    {
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });
       
       // create a new project with spaces in url.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'TestInvalid', 'TestURL',"", "", true);

       
       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

       // checking that project is not created with error.
         let error = objMap.project_description.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
           {
               expect(text).toBe("Description is required");
           });

       });

    });

    it('Create_project_with_spaces_in_description.tc', () => {

        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });
       
       // create a new project with spaces in url.
        objMap.add_icon.click();      
        globalFunc.fillProjectRequiredFields('Blank', 'InvalidDescription', 'DecrURL'," ", "", true);

       
       // click on Save and Get Started
        objMap.save_and_get_started_button.click();

        let error = objMap.project_description.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
            {
                expect(text).toBe("Description is required");
            });
        });

       // checking that project is not created with error.
       browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
       {
            error.getText().then(function(text)
            {
               expect(text).toBe("Description is required");
            });
        });

    });
    
    it('Create_project_with_non_existing_gitHub_url.tc', () => 
    { 
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });

        // create a new project with spaces in url.
        objMap.add_icon.click();  

        let giturl = "https://vr.git";
        // create a new project with only numbers in url     
        globalFunc.fillProjectRequiredFields('Pull From GitHub', 'GitHubProj', 'GitHubUrl','This project is pulled from github', giturl, true);

         // click on Save and Get Started
        objMap.save_and_get_started_button.click()
        expect(objMap.notificationsArray.count()).toBe(1);
        expect(objMap.notificationsArray.get(0).getText()).toBe('GitHub project does not exist!');
    });

    it('Create_project_with_invalid_gitHub_url.tc', () => 
    { 
        element(by.linkText('Dashboard')).click().then(() => {
            expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
        });
          
        // create a new project with spaces in url.
        objMap.add_icon.click();  

        let giturl = "https://google.com";
        // create a new project with only numbers in url     
        globalFunc.fillProjectRequiredFields('Pull From GitHub', 'GitHubProj', 'GitHubUrl','This project is pulled from github', giturl, true);

         // click on Save and Get Started
        objMap.save_and_get_started_button.click();
        let error = objMap.gitHub_URL.element(by.xpath("../div[@class='validation error ng-binding ng-scope']"));

        browser.wait(EC.visibilityOf(error), 15000,'Wait for error element to appear').then (() =>
        {
            error.getText().then(function(text)
            {
                expect(text).toBe("gitHub_URL");
            });
        });
    });

    it('Cleanup.tc', () => 
    {
    	//go to Dashboard
    	element(by.linkText('Dashboard')).click().then(() => 
        {
  			expect(browser.getCurrentUrl()).toEqual(common.CONSTANTS.spaceURL+"dashboard");
  		});

		globalFunc.delete_project("AbC123",true);
        globalFunc.delete_project("NumbersInURL",true);
        globalFunc.delete_project("SymbolsInURL",true);
        globalFunc.delete_project("Project is with max symbols in all input fields, i.e 64, 16, 128",true);

    });

});