/**
 * Created by xgharibyan on 3/23/17.
 */
"use strict";

const uitls = require('../utils/common');

const View = function () {

	// Login Locators
    this.LoginContainer 				= element(by.css('.sign-in'));
    this.userNameField  				= this.LoginContainer.element(by.model('$ctrl.formData.username'));
    this.passwordField  				= this.LoginContainer.element(by.model('$ctrl.formData.password'));
    this.loginButton    				= this.LoginContainer.element(by.css('.btn-submit'));
    this.wrongCredentials 				= this.LoginContainer.element(by.css('.text-wrong'));

	// Dashboard Locators
    this.dashboardContainer         	= element(by.css('.page-dashboard'));
    this.dashboardAccountWrapper    	= this.dashboardContainer.element(by.css('.hidden-xs'));

	this.Create_new_Project 			= element(by.xpath("//i[contains(@class, 'icon icon-add')]"));
    this.add_icon 						= element(by.xpath("//*[contains(@class,'icon-add')]"));

    // Function to generate (project settings), (project item), ... xpaths depending on project name.
    this.projectSettings                = function  (project_name) {
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    };
    this.projectItem                   = function (project_name) {
        return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/div[@class='item-content-wrapper']`));
    };

	// Project Locators
    this.create_project_title           = element(by.xpath("//*[text()='Select template to create a project OR import project from GitHub']"));
    this.Project_Template               = function (template_name) {
        return element(by.xpath(`//span[contains(@ng-class,'$ctrl.githubUrlValid') and contains(text(),'${template_name}')]/parent::label/parent::div`));
    };

    this.Project_Name_Field 			= element(by.xpath("//input[@data-ng-model='$ctrl.project.displayName']"));
	this.project_URL 					= element(by.xpath("//*[@id='project-url']"));
	this.project_description 			= element(by.xpath("//*[@id='area']"));
	this.save_and_get_started_button 	= element(by.xpath("//button[@data-ng-click='$ctrl.save()']"));

	this.publicProjectCheckbox          = element(by.xpath("//span[@data-ng-model='$ctrl.projectPublic']"));
	this.currentVersionLink             = element(by.xpath("//a[@class='text-yellow ng-binding']"));
	this.titleUserName                  = element(by.xpath("//span[@class='user-name ng-binding']"));
	// this.titleUserName                  = element(by.css('user-name'));


    this.isDisplayed_Login_Fields = function () {
        expect(this.LoginContainer.isDisplayed()).toBe(true);
        expect(this.userNameField.isDisplayed()).toBe(true);
        expect(this.passwordField.isDisplayed()).toBe(true);
    };
	
	this.isDisplayed_Project_Fields = function () {
        // expect(this.create_project_title.isDisplayed()).toBe(true);
        expect(this.Project_Name_Field.isDisplayed()).toBe(true);
        expect(this.project_URL.isDisplayed()).toBe(true);
        expect(this.project_description.isDisplayed()).toBe(true);
		expect(this.save_and_get_started_button.isDisplayed()).toBe(true);
    };

    this.processLogin = function (username, password, successLogin) {
        this.userNameField.sendKeys(username);
        this.passwordField.sendKeys(password);
        this.loginButton.click().then(() => {
            if(successLogin){
                expect(this.dashboardContainer.isDisplayed()).toBe(true);
                expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}dashboard`);
                this.dashboardAccountWrapper.evaluate('$ctrl.user').then((value) => {
                    expect(value.username).toEqual(username);
                });
            }
            else{
                expect(this.wrongCredentials.isDisplayed()).toBe(true);
                this.wrongCredentials.getText().then((text)=>{
                    expect(text).toEqual('Wrong username or password');
                });
            }
        })
    };

    this.add_project = function (successAdd) {
        this.add_icon.click().then(() => {
            expect(this.create_project_title.isDisplayed()).toBe(true);
            expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}project`);
        })
    };

    this.open_project_settings = function (project_name) {
        browser.actions().mouseMove(this.projectItem(project_name)).perform();
        this.projectSettings(project_name).click().then(() => {
            expect(this.titleUserName.isDisplayed()).toBe(true);
            this.titleUserName.getText().then((text)=>{
                expect(text).toEqual(`${project_name}`);
            });
            expect(browser.getCurrentUrl()).toContain(`${uitls.CONSTANTS.spaceURL}project`);
        })
    };

    this.publicProject = function (user, project_url) {
        this.publicProjectCheckbox.click().then(() => {
            expect(this.currentVersionLink.isDisplayed()).toBe(true);
            this.currentVersionLink.getText().then((text)=>{
                expect(text).toEqual(`${uitls.CONSTANTS.spaceURL}public/${user}/${project_url}`);

                console.log(`Publick link = ${uitls.CONSTANTS.spaceURL}${user}/${project_url}`);
            })
        })
    };

	
	this.process_fill_project_requred_fields = function (template_name, name, url, description, successCreate) {
		this.Project_Template(template_name).click();
	    this.Project_Name_Field.sendKeys(name);
        this.project_URL.sendKeys(url);
        this.project_description.sendKeys(description);
        this.save_and_get_started_button.click().then(() => {
            if(successCreate){
                expect(this.dashboardContainer.isDisplayed()).toBe(true);
                expect(browser.getCurrentUrl()).toEqual(`${uitls.CONSTANTS.spaceURL}dashboard`);
				// Should be added project name validation
                //this.dashboardAccountWrapper.evaluate('$ctrl.user').then((value) => {
                //    expect(value.username).toEqual(username);
                //});
            }
        })
    };

};

module.exports = new View();