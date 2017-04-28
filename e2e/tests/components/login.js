/**
 * Created by xgharibyan on 3/23/17.
 */
"use strict";

const uitls = require('../utils/common');

const View = function () {

	// Login XPATHs
    this.LoginContainer 				= element(by.css('.sign-in'));
    this.userNameField  				= this.LoginContainer.element(by.model('$ctrl.formData.username'));
    this.passwordField  				= this.LoginContainer.element(by.model('$ctrl.formData.password'));
    this.loginButton    				= this.LoginContainer.element(by.css('.btn-submit'));
    this.wrongCredentials 				= this.LoginContainer.element(by.css('.text-wrong'));

	// Dashboard XPATHs
    this.dashboardContainer         	= element(by.css('.page-dashboard'));
    // this.dashboardContainer         	= element(by.xpath("//body[contains(@class, 'dashboard')]"));
    this.dashboardAccountWrapper    	= this.dashboardContainer.element(by.css('.hidden-xs'));

	this.Create_new_Project 			= element(by.xpath("//i[contains(@class, 'icon icon-add')]"));
    // this.add_icon 						= element(by.css('[ng-click="$ctrl.createProject()"]'));
    this.add_icon 						= element(by.xpath("//*[contains(@class,'icon-add')]"));

	// Project XPATHs
    // template_name = 'Simple Project';
    this.create_project_title           = element(by.xpath("//*[text()='Select template to create a project OR import project from GitHub']"));
    //this.Project_Template				= element(by.xpath(`//span[contains(@ng-class,'$ctrl.githubUrlValid') and contains(text(), '${template_name}' )]`)); // TODO Ask Gharibyan how to
    this.Project_Template				= element(by.xpath("//span[contains(@ng-class,'$ctrl.githubUrlValid') and contains(text(),'Simple Project')]/parent::label/parent::div"));
    this.Project_Name_Field 			= element(by.xpath("//input[@data-ng-model='$ctrl.project.displayName']"));
	this.project_URL 					= element(by.xpath("//*[@id='project-url']"));
	this.project_description 			= element(by.xpath("//*[@id='area']"));
	this.save_and_get_started_button 	= element(by.xpath("//button[@data-ng-click='$ctrl.save()']"));

	
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
	
	this.process_fill_project_requred_fields = function (name, url, description, successCreate) {
		this.Project_Template.click();
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