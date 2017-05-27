/**
 * Created by melkabelka on 4/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const EC = protractor.ExpectedConditions;

describe('Dashboard.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[1].username, common.TESTUSERS[1].password, true);
    });
	
    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.add_project();
        globalFunc.isDisplayed_Project_Fields();
        globalFunc.process_fill_project_requred_fields(common.TEMPLATENAMES[1], "iOSAppProj", "iOSAppProjUrl", common.TESTPROJECTS[0].ProjectDescription, true);
    });

    it('iOS_publish_before_and_build.tc', () => {
    	// go to created project settings
    	globalFunc.open_project_settings('iOSAppProj');
        // click on iOS tab
        objMap.iosTab.click();
        // set application name
        this.dispName = element(by.model('$ctrl.project.ios.name')).sendKeys("iOSApp");
        // set application version
        this.version = element(by.model('$ctrl.project.ios.version')).sendKeys("1.1.1");
        // set boundle
        this.boundle = element(by.model('$ctrl.project.ios.bundle')).sendKeys("com.testiOS.io");
        // set developer ID
        this.developerId = element(by.model('$ctrl.project.ios.developerId')).sendKeys("TestDev");
        // upload provisiioning profile
        this.profileFile = browser.findElement(by.id("profile-file")).sendKeys("C:\\Users\\Mariam\\Downloads\\12d2bac8-68cd-432c-969d-7f7c56caf5ca.mobileprovision");
        // upload certificate
        this.certFile = browser.findElement(by.id("cert-file")).sendKeys("C:\\Users\\Mariam\\Downloads\\Cert.p12");
        // upload icon
        this.iconFile = browser.findElement(by.id("icon-file")).sendKeys("C:\\Users\\Mariam\\Pictures\\TestPicFormats\\PNG2.PNG");
        // click on build button
        this.submitBtn = element(by.buttonText('Build')).click();
        // check that publish&build dialog is opened
        expect(objMap.publishDialog.isDisplayed()).toBe(true);
        // click on publish button from publish&build dialog
        this.publish = element(by.css('[ng-click="$ctrl.gotToPublish()"]')).click();
        // check that Publish button from publish section is accessable and click on it
        this.publishBtn = element(by.buttonText("Publish"));
        expect(this.publishBtn.isDisplayed()).toBe(true);
        this.publishBtn.click();
        // click on publish: URL SHOULD BE CHANGED TO TEST ACCOUNT
        this.publishURL = element(by.linkText("https://rodin.space/mhers/iosappprojurl"));

     	// change focus on new opened tab
     	this.publishURL.click();
     	globalFunc.browserTabChange(1);

        // wait for VR object load : currently explicit wait is here but will be removed in future
    	browser.sleep(8000);
        
        // take a screenshot		
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL.png');
		});

        // go back to the main tab
		globalFunc.browserTabChange(0);

        // take a screenshot
		browser.takeScreenshot().then((png) => {
  			globalFunc.writeScreenShot(png, 'screenshots/iosAppProjURL1.png');
		});

        // click on iOS tab
        objMap.iosTab.click();
        // set application name
        this.dispName.sendKeys("iOSApp");
        // set application version
        this.version.sendKeys("1.1.1");
        // set boundle
        this.boundle.sendKeys("com.testiOS.io");
        // set developer ID
        this.developerId.sendKeys("TestDev");
        // upload provisiioning profile
        this.profileFile = browser.findElement(by.id("profile-file")).sendKeys("C:\\Users\\Mariam\\Downloads\\12d2bac8-68cd-432c-969d-7f7c56caf5ca.mobileprovision");
        // upload certificate
        this.certFile = browser.findElement(by.id("cert-file")).sendKeys("C:\\Users\\Mariam\\Downloads\\Cert.p12");
        // upload icon
        this.iconFile = browser.findElement(by.id("icon-file")).sendKeys("C:\\Users\\Mariam\\Pictures\\TestPicFormats\\PNG2.PNG");
        // click on build button
        this.submitBtn.click();
        // specify certificate password
        this.certPassword = element(by.model("$ctrl.project.ios.certPassword")).sendKeys("123123");
        // click on Sumbit button
        this.submitCertPass = element(by.css('[data-ng-click="$ctrl.build($event)"]')).click();
 
        //this.downloadBuild = element(by.css('.download'));
        // waits for the download element to be visible
        browser.wait(EC.visibilityOf(objMap.downloadBuild), 15000);
        // download build
        objMap.downloadBuild.click(); 

        // wait for download build to appear
        browser.sleep(8000);
        // this.checkFileDownload = function(path){
        //     fs.exists(path, (exists) => {
        //     console.log(exists ? 'aaaaaaaaaaaaaaaaaaaaaaaaaaait\'s there' : 'aaaaaaaaaaaaaaaanot there!');
        //     });
        // };

        // click on Publish to go to publish section
        //element( by.css('[ng-click="sendMail()"]') );
        //this.publishandbuild = element(by.css('[ng-click="$ctrl.publishNbuild($event)"]')).click();
        //this.cancel = element(by.linkText("Cancel")).click();
        //this.submitBtn.click();
        //this.publish = element(by.css('[ng-click="$ctrl.gotToPublish()"]')).click();

        //this.publish = element(by.css('[ng-click="$ctrl.gotToPublish()"]')).click();
        //this.publishBtn = element(by.buttonText("Publish"));
        //expect(this.publishBtn.isDisplayed()).toBe(true);
        //this.publishBtn.click();
    });

});