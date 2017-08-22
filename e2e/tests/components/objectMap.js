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

    // Reset Password Locators 
    this.registerForm                   = element(by.name("register"));
    this.forgetPswdLink                 = this.registerForm.element(by.linkText("Forgot password?"));
    this.resetPassEditBox               = element(by.model("$ctrl.formData.resetData"));
    this.resetPswdForm                  = element(by.name("resetPasswordForm"));
    this.submitBtn                      = this.resetPswdForm.element(by.partialButtonText("Submit"));

    // SignUp Locators
    this.newUserNameField  				= element(by.xpath("//input[@name='username']"));
    this.newEmailField  			    = element(by.xpath("//input[@name='email']"));
    this.NewPasswordField  				= element(by.xpath("//input[@name='password']"));
    this.NewPasswordConfirmField  		= element(by.xpath("//input[@name='passwordConfirm']"));
    this.AgreeCheckboxField    			= element(by.xpath("//input[@name='agreement']"));
    this.signUpButton    			    = element(by.xpath("//button[@type='submit']"));

    //TODO change xpaths to model
    this.usernameValidator              = element(by.xpath("//div[contains(@ng-if,\"formValidator:'username'\")]"));
    this.emailValidator                 = element(by.xpath("//div[contains(@ng-if,\"formValidator:'email'\")]"));
    this.passwordValidator              = element(by.xpath("//div[contains(@ng-class,\"formValidator:'password'\")]"));
    this.passwordConfirmValidator       = element(by.xpath("//div[contains(@ng-if,\"formValidator:'passwordConfirm'\")]"));

    // Admin page Locators
    this.adminPageUsernameField  		= element(by.xpath("//input[@name='username']"));
    this.adminPagePasswordField  		= element(by.xpath("//input[@name='password']"));
    this.adminPageFoundUsername = function(username){
        return element(by.xpath(`//tbody/tr/td[text()='${username}']`));
    };
    this.adminPageRemoveUser = function(username){
        return element(by.xpath(`//tbody/tr/td[text()='${username}']/parent::tr/td/div/a/i[contains(@style,'red')]/parent::a`));
    };
    this.adminPageConfirmDeleteButton   = element(by.xpath("//button[contains(text(),'Delete')]"));
    this.adminPageHeader                = element(by.xpath("//h1[@class='page-header']"));

    // Admin page Users Locators
    this.adminPageUsersField  		    = element(by.xpath("//a[contains(text(),'Users')]"));
    this.adminPageSearchByUsername  	= element(by.xpath("//input[@name='searchString']"));
    this.adminPageSignInButton    		= element(by.xpath("//button[@type='submit']"));

	// Dashboard Locators
    this.dashboardContainer         	= element(by.css('.page-dashboard'));
    this.dashboardAccountWrapper    	= this.dashboardContainer.element(by.css('.hidden-xs'));

    // Common locators for all builds
    this.publishDialog                  = element(by.css(".publish-modal"));
    this.iosTab                         = element(by.repeater('(key, navigation) in vm.navigation').row(2).column('navigation.title'));
    this.androidTab                     = element(by.repeater('(key, navigation) in vm.navigation').row(3).column('navigation.title'));
    this.oculusTab                      = element(by.repeater('(key, navigation) in vm.navigation').row(4).column('navigation.title'));
    this.viveTab                        = element(by.repeater('(key, navigation) in vm.navigation').row(5).column('navigation.title'));
    this.webTab                         = element(by.repeater('(key, navigation) in vm.navigation').row(6).column('navigation.title'));
    this.publishTab                     = element(by.repeater('(key, navigation) in vm.navigation').row(7).column('navigation.title'));

    // Web tab locators
    this.addCustomDomain                = element(by.xpath("//input[@name='enabled']/parent::span"));
    this.webWarningWindowDescription    = element(by.xpath("//p[@class='description word-wrap']"));
    this.webWarningWindowHeader         = element(by.xpath("//div[@class='modal-header']/p"));
    this.publishProjectButton           = element(by.xpath("//button[@ng-click='$ctrl.gotToPublish()']"));
    this.cancelButton                   = element(by.xpath("//a[text()='Cancel']"));
    this.yourProjectCurrentURL          = element(by.xpath("//a[@class='text-yellow ng-binding']"));
    this.pleaseMakeARecordString        = element(by.xpath("//p[@class='form-description ng-binding']"));
    this.webInputUrl                    = element(by.xpath("//input[@name='url']"));
    this.webSubmitButton                = element(by.xpath("//button[@type='submit']"));
    this.webDeleteDomainButton          = element(by.xpath("//a[@ng-click='$ctrl.deleteDomain($event)']"));
    this.webDeleteDomainConfirmButton   = element(by.xpath("//button[@ng-if='$ctrl.delete']"));
    this.webDeleteDomainConfirmDesc     = element(by.xpath("//span[@class='text-highlight']"));
    this.addDomainNameNotification      = element(by.xpath("//div[@ng-bind-html='message']"));


    // Publish tab locators
    this.publishTabSectionTitle         = element(by.xpath("//h3[@class='section-title']"));
    this.publishTabDescription          = element(by.xpath("//p[@class='description']/parent::div[@class='publish-date']"));
    this.publishButtonInPublishTab      = element(by.xpath("//button[@ng-click='$ctrl.publish()']"));
    this.lastPublishedAtString          = element(by.xpath("//p[@class='description ng-binding']"));
    this.yourProjectIsPublishedOn       = element(by.xpath("//a[@class='text-yellow ng-binding']"));

    // iOS build section
    this.certificatePswdDialog          = element(by.css(".modal-content"));
    this.downloadBuild                  = element(by.css('.download'));

    // Create new project
    this.add_icon 						= element(by.css('.icon-add'));

    // Edit profile
    this.accountLabel                   = $('#accountLabel'); // is same as ***element(by.id('accountLabel'));***
    this.editProfile                    = element(by.xpath("//a[@data-ui-sref='app.profile']"));
    this.accountSettingsTitle           = element(by.xpath("//h1[@class='title']"));
    this.facebookSync                   = element(by.xpath("//button[@ng-click='$ctrl.fbSync()']"));
    this.googleSync                     = element(by.xpath("//button[@ng-click='$ctrl.googleSync()']"));
    this.firstName                      = element(by.model("$ctrl.currentUser.profile.firstName"));
    this.lastName                       = element(by.model("$ctrl.currentUser.profile.lastName"));
    this.country                        = element(by.model("$ctrl.currentUser.profile.city"));
    this.editEmail                      = element(by.model("$ctrl.currentUser.email"));
    this.unSyncModal                    = element(by.id("modalUnSync"));
    this.updateProfile                  = element(by.partialButtonText('Update Profile'));
    // password tab
    this.passwordTab                    = element(by.linkText('Password'));
    this.newPassword                    = element(by.model('$ctrl.newPassword.password'));
    this.confirmPassword                = element(by.model('$ctrl.newPassword.confirm'));
    this.confirmPass                    = element(by.buttonText('Update Password'));



    this.passwordTab                    = element(by.xpath("//a[text()='Password']"));
    this.passwordString                 = element(by.xpath("//h3[text()='Change Password']"));
    this.newPassword                    = element(by.xpath("//input[@data-ng-model='$ctrl.newPassword.password']"));
    this.confirmPassword                = element(by.xpath("//input[@data-ng-model='$ctrl.newPassword.confirm']"));
    this.updatePassword                 = element(by.xpath("//button[contains(text(), 'Update Password')]"));
    this.passwordSuccessMsg             = element(by.xpath("//div[@ng-bind-html='message']"));
    this.signOutLabel                   = element(by.xpath("//a[@data-ng-click='$ctrl.logout()']"));


    this.googleSynced_link              = element(by.xpath("//span[contains(@ng-click,'$ctrl.openUnSync') and contains(@ng-click,'google')]"));
    this.googleUnsyncWndTitle           = element(by.xpath("//*[@close-modal='unsync']/*/*/*[@class='ng-binding']"));
    this.googleUnSync_button            = element(by.xpath("//button[@ng-click='$ctrl.confirmUnsync()']"));
    this.googleUnSync_button_cancel     = element(by.xpath("//a[@data-ng-click='$ctrl.modals.unsync = false']"));

    // Project settings Tab

    this.projectThumbnail                = element(by.xpath("//*[@ng-click='$ctrl.onUploadAreaClick()'][1]"));
    this.projectNameInSettings           = element(by.className('user-name ng-binding'));
    this.projectNameInputInSettings      = element(by.model('$ctrl.project.displayName'));
    this.projectDescInputInSettings      = element(by.model('$ctrl.project.description'));

    //Notification texts
	// Be Aware that I've chnaged this by binding.
    //this.notificationText               = element(by.xpath("//div[@ng-bind-html='message']"));    //  Check .text() value
	this.notificationsArray             = element.all(by.binding('message'));
	this.wrongSizeImageNotification     = element(by.xpath("//div[@class='message ng-binding']"));

    //Loaders
    this.loaderPresence                 = element(by.xpath("//div[@class='loaderContent']"));


    //Google Login
    this.googleUrl                      = "gmail.com";
    this.googleEmail		            = $('#identifierId');    //element(by.id('identifierId'));
    this.nextButton                     = element(by.xpath("//span[text()='Next']"));
    this.googlePassword                 = element(by.xpath("//input[@name='password']"));

    this.googleSynced                   = element(by.xpath("div[text()='Google synced']"));



    this.projectName = function(project_name){
        return element(by.xpath(`//div[@class='dashboard-content-item']/h3/a[text()[contains(.,'${project_name}')]]`));
    };

    // Dashboard
    this.searchField                    = element.all(by.xpath("//input[@data-ng-change='$ctrl.search()']"));
    this.allProjects                    = element.all(by.xpath("//div[@class='dashboard-content-item']/h3/a"));
    
    // "Delete" Modal elements
    this.deleteModal                    = element(by.xpath("//div[@class='modal-header']/p[text()='Delete this project ?']/../.."));
    this.cancelBtn                      = this.deleteModal.element(by.className('btn btn-cancel'));
    this.deleteBtn                      = this.deleteModal.element(by.className('btn btn-negative'));


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

    //TODO check why is not working
    //this.create_project_title           = element(by.xpath("//*[text()='Select template to create a project OR import project from GitHub']"));
    this.create_project_title           = element(by.xpath("//*[text()[contains(.,'Select template to create a project OR import project from')]]"));

    this.Project_Template               = function (template_name) {
        // return element(by.xpath(`//span[contains(@ng-class,'$ctrl.githubUrlValid') and contains(text(),'${template_name}')]/parent::label/parent::div`));    // Changed old
        return element(by.xpath(`//span[contains(@class,'template-name') and contains(text(),'${template_name}')]/parent::label/parent::div`));
    };

    this.project_tempalte               = function (template_name) 
    {
        let rowNumber = -1;
        switch(template_name) 
        {
            case 'Blank':
                rowNumber = 0;
                break;

            case 'Basic':
                rowNumber = 1;
                break;
                
            case "Drag'n'Drop":
                rowNumber = 2;
                break;
                
            case 'Presentation Hall':
                rowNumber = 3;
                break;
                
            case 'Interior':
                rowNumber = 4;
                break;
                
            case '360 Video Player':
                rowNumber = 5;
                break;
                 
            case 'Video Gallery':
                rowNumber = 6;
                break;
                 
            case 'Pull From GitHub':
                rowNumber = 7;
                break;
                                                                                                
            default:
                console.log('!!!PROJECT TEMPLATE NAMES ARE CHANGED!!!');
                rowNumber = 0;
                break;
        }
        return element(by.repeater('project in list').row(rowNumber).column('project.name'))   
    };

    //this.Project_Name_Field 			= element(by.xpath("//input[@data-ng-model='$ctrl.project.displayName']"));
	this.Project_Name_Field             = element(by.model('$ctrl.project.displayName'));
    
    //this.project_URL 					= element(by.xpath("//*[@id='project-url']"));
	this.project_URL                    = element(by.model('$ctrl.project.name'));  
    
  //  this.project_description 			= element(by.xpath("//*[@id='area']"));
	this.project_description            = element(by.model('projectDescription'));

    this.gitHub_URL                     = element(by.model('$ctrl.project.githubUrl'));

    //this.save_and_get_started_button 	= element(by.xpath("//button[@data-ng-click='$ctrl.save()']"));
    this.save_and_get_started_button 	= element(by.xpath("//button[@data-ng-click='$ctrl.save(project.$valid)']"));   // changed

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
    this.editorTitle                    = element(by.xpath("//title[contains(text(),'Editor')]"));

    this.editorProjectsDropdownUrl      = function (project_url) {
        return element(by.xpath(`//a[text()='${project_url}']`));
    };


};

module.exports = new TestObj();