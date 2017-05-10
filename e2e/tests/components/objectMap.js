/**
 * Created by melkabelka on 5/10/17.
 */

const TestObj = function () {

	// Login Locators
    this.LoginContainer                 = element(by.css('.sign-in'));
    this.userNameField  				= this.LoginContainer.element(by.model('$ctrl.formData.username'));
    this.passwordField  				= this.LoginContainer.element(by.model('$ctrl.formData.password'));
    this.loginButton    				= this.LoginContainer.element(by.css('.btn-submit'));
    this.wrongCredentials 				= this.LoginContainer.element(by.css('.text-wrong'));

	// Dashboard Locators
    this.dashboardContainer         	= element(by.css('.page-dashboard'));
    this.dashboardAccountWrapper    	= this.dashboardContainer.element(by.css('.hidden-xs'));

	this.Create_new_Project 			= element(by.xpath("//i[contains(@class, 'icon icon-add')]"));
    this.add_icon 						= element(by.xpath("//*[contains(@class,'icon-add')]"));


	// Project Locators
    this.create_project_title           = element(by.xpath("//*[text()='Select template to create a project OR import project from GitHub']"));
    this.Project_Template               = function (template_name) {
        return element(by.xpath(`//span[contains(@ng-class,'$ctrl.githubUrlValid') and contains(text(),'${template_name}')]/parent::label/parent::div`));
    };

    //this.Project_Name_Field 			= element(by.xpath("//input[@data-ng-model='$ctrl.project.displayName']"));
	this.Project_Name_Field             = element(by.model('$ctrl.project.displayName'));
    
    //this.project_URL 					= element(by.xpath("//*[@id='project-url']"));
	this.project_URL                    = element(by.model('$ctrl.project.name'));  
    
  //  this.project_description 			= element(by.xpath("//*[@id='area']"));
	this.project_description            = element(by.model('projectDescription'));
    this.save_and_get_started_button 	= element(by.xpath("//button[@data-ng-click='$ctrl.save()']"));

	this.publicProjectCheckbox          = element(by.xpath("//span[@data-ng-model='$ctrl.projectPublic']"));
	this.currentVersionLink             = element(by.xpath("//a[@class='text-yellow ng-binding']"));
	this.titleUserName                  = element(by.xpath("//span[@class='user-name ng-binding']"));
	// this.titleUserName                  = element(by.css('user-name'));

    // public project and canvas
    this.canvas                         = element(by.xpath('//canvas'));
    this.scriptSrc                      = element(by.xpath("//script[@src='https://cdn.rodin.io/v0.0.5/vendor/vendor.js']"));

    // error page
    this.error404                       = element(by.xpath("//h1[text()='404']"));
};

module.exports = new TestObj();