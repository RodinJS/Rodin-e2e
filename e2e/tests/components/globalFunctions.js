/**
 * Created by melkabelka on 5/10/17.
 */

"use strict";

const uitls = require('../utils/common');
const objMap = require('../components/objectMap');

const globalFunc = function () {

    // Function to generate (project settings), (project item), ... xpaths depending on project name.
    
    this.projectSettings                = function  (project_name) {
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    };
    
    this.projectItem                   = function (project_name) {
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/div[@class='item-content-wrapper']`));
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
                expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}dashboard`);
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

    this.add_project = function (successAdd) {
        objMap.add_icon.click().then(() => {
            expect(objMap.create_project_title.isDisplayed()).toBe(true);
            expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}project`);
        })
    };

	this.process_fill_project_requred_fields = function (template_name, name, url, description, successCreate) {
		objMap.Project_Template(template_name).click();
	    objMap.Project_Name_Field.sendKeys(name);
        objMap.project_URL.sendKeys(url);
        objMap.project_description.sendKeys(description);
        objMap.save_and_get_started_button.click().then(() => {
            if(successCreate){
                expect(objMap.dashboardContainer.isDisplayed()).toBe(true);
                expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}dashboard`);
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
            expect(browser.getCurrentUrl()).toContain(`${uitls.CONSTANTS.spaceURL}project`);
        })
    };

    this.publicProject = function (user, project_url) {
        objMap.publicProjectCheckbox.click().then(() => {
            expect(objMap.currentVersionLink.isDisplayed()).toBe(true);
            objMap.currentVersionLink.getText().then((text)=>{
                expect(text).toEqual(`${uitls.CONSTANTS.spaceURL}public/${user}/${project_url}`);

                console.log(`Publick link = ${uitls.CONSTANTS.spaceURL}${user}/${project_url}`);
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
                    expect(browser.driver.getCurrentUrl()).toContain(`${uitls.CONSTANTS.spaceURL}public/${user}/${project_url}/?t=`);
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
            browser.get(`${uitls.CONSTANTS.spaceURL}public/${user}/${project_url}/?t=`).then(() => {
                expect(objMap.error404.isDisplayed()).toBe(true);
            });
    };

};

module.exports = new globalFunc();