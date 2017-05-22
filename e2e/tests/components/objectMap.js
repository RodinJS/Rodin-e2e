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
    this.wrongCredentials2 				= element(by.css('.ng-binding'));

	// Dashboard Locators
    this.dashboardContainer         	= element(by.css('.page-dashboard'));
    this.dashboardAccountWrapper    	= this.dashboardContainer.element(by.css('.hidden-xs'));

    // Create new project
    this.add_icon 						= element(by.css('.icon-add'));

    this.accountLabel                   = $('#accountLabel'); // is same as ***element(by.id('accountLabel'));***
    this.editProfile                    = element(by.xpath("//a[@data-ui-sref='app.profile']"));
    this.accountSettingsTitle           = element(by.xpath("//h1[@class='title']"));
    this.facebookSync                   = element(by.xpath("//button[@ng-click='$ctrl.fbSync()']"));
    this.googleSync                     = element(by.xpath("//button[@ng-click='$ctrl.googleSync()']"));

    this.googleSynced_link              = element(by.xpath("//span[contains(@ng-click,'$ctrl.openUnSync') and contains(@ng-click,'google')]"));
    this.googleUnsyncWndTitle           = element(by.xpath("//*[@close-modal='unsync']/*/*/*[@class='ng-binding']"));
    this.googleUnSync_button            = element(by.xpath("//button[@ng-click='$ctrl.confirmUnsync()']"));
    this.googleUnSync_button_cancel     = element(by.xpath("//a[@data-ng-click='$ctrl.modals.unsync = false']"));

    //Notification text
    this.notificationText               = element(by.xpath("div[@ng-bind-html='message']"));    //  Check .text() value

    //Google Login
    this.googleUrl                      = "gmail.com";
    this.googleEmail		            = $('#identifierId');    //element(by.id('identifierId'));
    this.nextButton                     = element(by.xpath("//span[text()='Next']"));
    this.googlePassword                 = element(by.xpath("//input[@name='password']"));

    this.googleSynced                   = element(by.xpath("div[text()='Google synced']"));



    // // Function to generate (project settings), (project item), ... xpaths depending on project name.
    // this.projectSettings              = function  (project_name) {
    //     return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    // };
    //
    // this.projectOpenInEditor          = function  (user_name, project_url) {
    //     return element(by.xpath(`//a[@href='https://editor.${url}${user_name}/${project_url}']`));
    // };
    //
    // this.projectDelete                = function  (project_name) {
    //     // return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/*/*/*/*/*/i[@class[contains(.,'icon-settings')]]/parent::a`));
    // };
    //
    // this.projectItem                   = function (project_name) {
    //     return element(by.xpath(`//div[@class='dashboard-content-item']/a/h3[text()[contains(.,'${project_name}')]]/parent::a/parent::div/div[@class='item-content-wrapper']`));
    // };


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

    // Editor Page
    this.editorLoader                   = element(by.xpath("//div[@class='loaderContent']"));
    this.editorProjectsDropdown         = element(by.xpath("//a[@class='dropdown-toggle btn-folder-name ng-binding']"));

    this.editorProjectsDropdownUrl      = function (project_url) {
        return element(by.xpath(`//a[text()='${project_url}']`));
    };


};

module.exports = new TestObj();