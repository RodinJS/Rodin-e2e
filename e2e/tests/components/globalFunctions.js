/**
 * Created by melkabelka on 5/10/17.
 */

"use strict";
const fs = require('fs');

const utils = require('../utils/common');
const objMap = require('../components/objectMap');

const globalFunc = function () {

    // TODO move these xpaths to objectMap.js
    // Function to generate (project settings), (project item), ... xpaths depending on project name.
    this.projectSettings              = function  (project_name) {
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    };

    this.projectOpenInEditor          = function  (user_name, project_url) {
        let url = utils.CONSTANTS.spaceURL.replace("https://", "");
        return element(by.xpath(`//a[@href='https://editor.${url}${user_name}/${project_url}']`));
    };

    this.projectDelete                = function  (project_name) {
        // return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    };

    this.projectItem                   = function (project_name) {
        // return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/div[@class='item-content-wrapper']`));
        return element(by.xpath(`//div[@class='dashboard-content-item']/h3/a[text()[contains(.,'${project_name}')]]/parent::h3/parent::div/*/*/*/a[@class='item-title-link']`));
    };

    // Editor Page
    this.editorProjectsDropdownUrl      = function (project_url) {
        return element(by.xpath(`//a[text()='${project_url}']`));
    };

    this.isDisplayed_Login_Fields = function () {
        expect(objMap.LoginContainer.isDisplayed()).toBe(true);
        expect(objMap.userNameField.isDisplayed()).toBe(true);
        expect(objMap.passwordField.isDisplayed()).toBe(true);
    };
	
	this.isDisplayed_Project_Fields = function () {
        // expect(this.create_project_title.isDisplayed()).toBe(true);
        expect(objMap.Project_Name_Field.isDisplayed()).toBe(true);
        expect(objMap.project_URL.isDisplayed()).toBe(true);
        expect(objMap.project_description.isDisplayed()).toBe(true);
		expect(objMap.save_and_get_started_button.isDisplayed()).toBe(true);
    };

    this.processLogin = function (username, password, successLogin) {
        objMap.userNameField.sendKeys(username);
        objMap.passwordField.sendKeys(password);
        objMap.loginButton.click().then(() => {
            if(successLogin){
                expect(objMap.dashboardContainer.isDisplayed()).toBe(true);
                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}dashboard`);
                objMap.dashboardAccountWrapper.evaluate('$ctrl.user').then((value) => {
                    expect(value.username).toEqual(username);
                });
            }
            else{
                expect(objMap.wrongCredentials.isDisplayed()).toBe(true);
                objMap.wrongCredentials.getText().then((text)=>{
                    expect(text).toEqual('Wrong username or password');
                });
            }
        })
    };

    this.add_project = function () {
        objMap.add_icon.click().then(() => {
            expect(objMap.create_project_title.isDisplayed()).toBe(true);
            expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}project`);
        })
    };

    this.check_notification_text = function () {
        objMap.add_icon.click().then(() => {
            expect(objMap.notificationText.getText().then((text)=>{
                expect(text).toEqual(`${utils.golden.Max_project_count_msg}`);
            }));
        });
    };

    this.openEditProfile = function () {
        objMap.accountLabel.click().then(() => {
            objMap.editProfile.click().then(() => {
                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}profile`);
                expect(objMap.accountSettingsTitle.isDisplayed()).toBe(true);
                objMap.accountSettingsTitle.getText().then((text)=>{
                    expect(text).toEqual(`${utils.golden.Title_profile_page}`);
                });
                expect(objMap.passwordTab.isDisplayed()).toBe(true);
            })
        })
    };


    // add objMap xpaths ...
    // passwordTab
    // passwordString
    // newPassword
    // confirmPassword
    // updatePassword
    // passwordSuccessMsg
    // signOutLabel
    //
    this.changePasswordTo = function (password) {
        objMap.passwordTab.click().then(() => {
            expect(objMap.passwordString.isDisplayed()).toBe(true);
            objMap.passwordString.getText().then((text) => {
                expect(text).toEqual("Change Password"); //TODO Should be added to golden constants!
            });
        });
        objMap.newPassword.sendKeys(password);
        objMap.confirmPassword.sendKeys(password);
        objMap.updatePassword.click().then(() => {
            expect(objMap.passwordSuccessMsg.isDisplayed()).toBe(true);
            objMap.passwordSuccessMsg.getText().then((text) => {
                expect(text).toEqual("Password successfully updated"); //TODO Should be added to golden constants!
            });
        });
    };

    // add objMap xpaths ...
    // signOutLabel
    this.signOut = function () {
        objMap.accountLabel.click().then(() => {
            objMap.signOutLabel.click().then(() => {
                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}login`);
                this.isDisplayed_Login_Fields();        // TODO Check if is working
            })
        })
    };




    // working here ))
    this.syncWithGoogleFunction = function () {
        objMap.googleSync.click().then(() => {
            browser.ignoreSynchronization = true;
            // Make sure that the new window is opened and navigate to it
            browser.getAllWindowHandles().then(function(handles){
                browser.switchTo().window(handles[1]).then(function(){
                    expect(objMap.googleEmail.isDisplayed()).toBe(true);
                    expect(objMap.nextButton.isDisplayed()).toBe(true);
                    objMap.googleEmail.sendKeys("mher@rodin.io");
                    objMap.nextButton.click().then(() => {
                        browser.driver.sleep(2000);     // TODO Should be removed and added while with timeout loop! as then expect is not soling googlePassword to be displayed problem
                        expect(objMap.nextButton.isDisplayed()).toBe(true);
                        expect(objMap.googlePassword.isDisplayed()).toBe(true).then(function() {
                            objMap.googlePassword.sendKeys("Rr14815/*-");
                            objMap.nextButton.click();
                            // browser.switchTo().window(handles[0])
                        });
                    });
                });
            });
        });
        // browser.switchTo().window(handles[0]);
        browser.driver.sleep(2000);
        browser.ignoreSynchronization = false;
        console.log("3. before googleSynced");
        // expect(objMap.nextButton.isDisplayed()).toBe(true);
        expect(objMap.googleSynced.isDisplayed()).toBe(true);
        // browser.driver.sleep(10000);
        console.log("4. after googleSynced");
    };

    this.syncWithGoogle = function () {
        // if (!expect(objMap.googleSync.isDisplayed()).toBe(true)) {
        if (expect(objMap.googleSynced_link.isDisplayed()).toBe(true)) {
            objMap.googleSynced_link.click().then(function () {
                objMap.googleUnsyncWndTitle.getText().then((text) => {
                    expect(text).toEqual("Unsync from google"); //TODO Should be added to golden constants!
                });
                expect(objMap.googleUnSync_button.isDisplayed()).toBe(true);
                objMap.googleUnSync_button.click();
            });
            // write code to unsync from google
            this.syncWithGoogleFunction();
        } else {
            this.syncWithGoogleFunction();
        }
        console.log("5. In syncWithGoogle");
    };

    //TODO there is another function for this below this function: "fillProjectRequiredFields"
	// this.process_fill_project_requred_fields = function (template_name, name, url, description, successCreate) {
	// 	objMap.Project_Template(template_name).click();
	    
 //        objMap.Project_Name_Field.sendKeys(name);
 //        objMap.project_URL.sendKeys(url);
 //        objMap.project_description.sendKeys(description);
 //        objMap.save_and_get_started_button.click().then(() => {
 //            if(successCreate){
 //                expect(objMap.dashboardContainer.isDisplayed()).toBe(true);
 //                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}dashboard`);
	// 			// Should be added project name validation
 //                //this.dashboardAccountWrapper.evaluate('$ctrl.user').then((value) => {
 //                //    expect(value.username).toEqual(username);
 //                //});
 //            }
 //        })
 //    };

    this.fillProjectRequiredFields = function (template_name, project_name, project_url, project_description, gitHub_url = '')
    {
        // select template
        objMap.project_tempalte(template_name).click();

        // type project name
        objMap.Project_Name_Field.sendKeys(project_name);
        
        // type project URL
        objMap.project_URL.sendKeys(project_url);

        // type project description
        objMap.project_description.sendKeys(project_description);

        // if gitHub template is used also specify GitHub URL
        if(template_name == 'Pull From GitHub')
        {
            objMap.gitHub_URL = gitHub_url;
        }

    };

    this.createProject = function (template_name, project_name, project_url, project_description, gitHub_url = '', gitHub_synced = false)
    {
        // click on + button to create a project
        objMap.add_icon.click();

        // Fill all required fields
        this.fillProjectRequiredFields(template_name, project_name, project_url, project_description, gitHub_url);

        // click on Save and Get Started
        objMap.save_and_get_started_button.click();

        // Message should pop up that project is created
        if(gitHub_synced)
        {
        	expect(objMap.notificationsArray.count()).toBe(1);
        	expect(objMap.notificationsArray.get(0).getText()).toBe('Project created');
        	
        } else {
        	expect(objMap.notificationsArray.count()).toBe(2);
        	expect(objMap.notificationsArray.get(0).getText()).toBe('GitHub account not linked to this user!');
        	expect(objMap.notificationsArray.get(1).getText()).toBe('Project created');
        }
        

    }; 

    this.isProjectCreated = function(project_name)
    {
        // TODO
        // check that project with its name is added in dashboard
    };

	this.projectsCountInDashboard = function () {
         return objMap.allProjects.count();
    };

    this.searchProject = function (searchText) {
        objMap.searchField.sendKeys(searchText).then(() => {

            // TODO Sleep should be removed and "search is done" successfully logic should be added here!!!
            browser.driver.sleep(2000);

            objMap.allProjects.count().then(function(count){
                expect(count).toEqual(1);
                console.log("INFO: Found Projects after search of '" + searchText + "' is: " + count);
            });
        });
    };

    this.open_project_settings = function (project_name) {
        browser.actions().mouseMove(this.projectItem(project_name)).perform();
        this.projectSettings(project_name).click().then(() => {
            expect(objMap.titleUserName.isDisplayed()).toBe(true);
            objMap.titleUserName.getText().then((text)=>{
                expect(text).toEqual(`${project_name}`);
            });
            expect(browser.getCurrentUrl()).toContain(`${utils.CONSTANTS.spaceURL}project`);
        })
    };

    this.open_project_settings_byIndex = function (index)
    {

        // TODO this should be changed to more proper way
        // Currently in main function browser maximize function is used to make all elemenets visible.
        
        // Get project by index -> Last one is first with index 2 in the list
        this.projectSettingsByIndex = browser.findElement(by.xpath("//div[contains(@class,'row')]/div["+index+"]/div/div/div[2]"));
        // hover on element to be visible
        browser.actions().mouseMove(this.projectSettingsByIndex).perform();
        
        // this is required as sometimes object is not being found.
        this.projectSettingsByIndex = browser.findElement(by.xpath("//div[contains(@class,'row')]/div["+index+"]/div/div/div[2]/ul[2]/li/a/i"));
        
        // click on project settings by its index
        this.projectSettingsByIndex.click();
    };

    // Is not working: ERROR:  Failed: Error while waiting for Protractor to sync with the page: "Cannot read property '$$testability' of undefined"
    // Waiting for 5.1.2 version of protractor
    this.open_project_in_editor = function (user_name, project_name, project_url) {
        browser.actions().mouseMove(this.projectItem(project_name)).perform();
        this.projectOpenInEditor(user_name, project_url).click().then((data) => {
            // console.log('DATA', data);

            expect(objMap.editorLoader.isDisplayed()).toBe(true);
            expect(objMap.editorProjectsDropdown.isDisplayed()).toBe(true);
            this.editorProjectsDropdownUrl(project_url).getText().then((text)=>{
                expect(text).toEqual(`/${project_url}`);
            });
            //https://editor.rodin.space/mhers/url559128
            let url = utils.CONSTANTS.spaceURL.replace("https://", "https://editor.");  // TODO check if it is possible to get current using environment
            expect(browser.getCurrentUrl()).toContain(`${url}${user_name}/${project_url}`);
        });

            // .catch(err=>{
            //     console.log('ERRR', err);
            // })
    };

    this.publicProject = function (user, project_url) {
        objMap.publicProjectCheckbox.click().then(() => {
            expect(objMap.currentVersionLink.isDisplayed()).toBe(true);
            objMap.currentVersionLink.getText().then((text)=>{
                expect(text).toEqual(`${utils.CONSTANTS.spaceURL}public/${user}/${project_url}`);

                console.log(`Publick link = ${utils.CONSTANTS.spaceURL}${user}/${project_url}`);
            })
        })
    };

    this.UnPublicProject = function (user, project_url) {
        objMap.publicProjectCheckbox.click();
            // .then(() => {
            // TODO Check element not to be present is not working yet
            // expect(this.currentVersionLink.isPresent()).toEqual(false);
        // })
    };

    this.openPublicProject = function (user, project_url) {
        objMap.currentVersionLink.click().then(() => {
            browser.ignoreSynchronization = true;
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]);
                browser.getCurrentUrl().then( function( url ) {
                    console.log(`Current version: =  ${url}`);
                    expect(browser.driver.getCurrentUrl()).toContain(`${utils.CONSTANTS.spaceURL}public/${user}/${project_url}/?t=`);
                    // TODO This part is not implimented yet
                    // expect(this.scriptSrc.isDisplayed()).toBe(true);
                    // expect(this.canvas.isDisplayed()).toBe(true);
                });
                browser.ignoreSynchronization = false;
            });
        });
    };

    this.openUnPublicProject = function (user, project_url) {
        // this.currentVersionLink.click().then(() => {
            // TODO make Publick url global variable!
            browser.get(`${utils.CONSTANTS.spaceURL}public/${user}/${project_url}/?t=`).then(() => {
                expect(objMap.error404.isDisplayed()).toBe(true);
            });
    };

    // this function is for taking browser screenshot
    this.writeScreenShot = function (data, filename) {
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };

    // this function for switch from one tab to another
    this.browserTabChange = function (tabNumber) {
        browser.getAllWindowHandles().then(function (handles) {
                let newWindowHandle = handles[tabNumber]; // this is your new window
                browser.switchTo().window(newWindowHandle);
            }); 
    };

};

module.exports = new globalFunc();