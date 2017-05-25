/**
 * Created by melkabelka on 5/10/17.
 */

"use strict";

const utils = require('../utils/common');
const objMap = require('../components/objectMap');

const globalFunc = function () {

    //TODO ask Raffi or Khach about moving these functions to objectMap
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
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/div[@class='item-content-wrapper']`));
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

    this.openEditProfile = function () {
        objMap.accountLabel.click().then(() => {
            objMap.editProfile.click().then(() => {
                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}profile`);
                expect(objMap.accountSettingsTitle.isDisplayed()).toBe(true);
                objMap.accountSettingsTitle.getText().then((text)=>{
                    expect(text).toEqual(`${utils.golden.Title_profile_page}`);
                });
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





	this.process_fill_project_requred_fields = function (template_name, name, url, description, successCreate) {
		objMap.Project_Template(template_name).click();
	    objMap.Project_Name_Field.sendKeys(name);
        objMap.project_URL.sendKeys(url);
        objMap.project_description.sendKeys(description);
        objMap.save_and_get_started_button.click().then(() => {
            if(successCreate){
                expect(objMap.dashboardContainer.isDisplayed()).toBe(true);
                expect(browser.getCurrentUrl()).toEqual(`${utils.CONSTANTS.spaceURL}dashboard`);
				// Should be added project name validation
                //this.dashboardAccountWrapper.evaluate('$ctrl.user').then((value) => {
                //    expect(value.username).toEqual(username);
                //});
            }
        })
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

    // this function and variable is for taking browser screenshot
    var fs = require('fs');
    this.writeScreenShot = function (data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    };

    // this function for switchinf from one tab to another
    this.browserTabChange = function (tabNumber) {
        browser.getAllWindowHandles().then(function (handles) {
                var newWindowHandle = handles[tabNumber]; // this is your new window
                browser.switchTo().window(newWindowHandle);
            }); 
    };

};

module.exports = new globalFunc();