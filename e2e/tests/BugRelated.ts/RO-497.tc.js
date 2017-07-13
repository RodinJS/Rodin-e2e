/**
 * Created by mhers on 4/13/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;


describe('BugRelated.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });

    user_name = common.USERS.MherS.username;
    url = common.CONSTANTS.spaceURL;

    //TODO this variable should be added in constants
    domainName = "qa3.rodin.design";

    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;


    //TODO Remove after finish
    // project_name = "name4539074";
    // project_url = "url4539074";

    //TODO uncomment after finish
    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject('Video Gallery', project_name, project_url, project_description, "", true);
    });

    // TODO Should be used to make Web tab related all test cases
    // TODO All strings should be added in golden constants
    it('RO-497.tc', () => {
     
		// go to created project's settings
        globalFunc.open_project_settings(project_name);

        // click on Web tab
        objMap.webTab.click();

        browser.wait(EC.visibilityOf(objMap.addCustomDomain), 5000);

        // Click on Add custom domain checkbox
        objMap.addCustomDomain.click().then(()=> {
            objMap.webWarningWindowDescription.getText().then((text) => {
                expect(text).toContain("To connect a URL to your project you need to publish it first.");
            });
            objMap.webWarningWindowHeader.getText().then((text) => {
                expect(text).toContain("Warning");
            });
        });

        // Click on publish button and check warrning window opens with header and description
        objMap.publishProjectButton.click().then(()=>{
            objMap.publishTabSectionTitle.getText().then((text) => {
                expect(text).toContain("Publish project");
            });
            objMap.publishTabDescription.getText().then((text) => {
                expect(text).toContain("This project is not published yet.");
            });
        });

        // Click on publish button in publish tab and check last published and published on strings
        objMap.publishButtonInPublishTab.click().then(()=>{
            objMap.lastPublishedAtString.getText().then((text) => {
                expect(text).toContain("Last publish at");
            });
            objMap.yourProjectIsPublishedOn.getText().then((text) => {
                expect(text).toContain(`${url}${user_name}/${project_url}`);
            });
        });

        // click on Web tab and check yourProjectCurrentURL
        objMap.webTab.click().then(()=>{
            objMap.yourProjectCurrentURL.getText().then((text) => {
                expect(text).toContain(`${url}${user_name}/${project_url}`);
            });
        });

        // Click again on Add custom domain checkbox
        objMap.addCustomDomain.click().then(()=> {
            objMap.pleaseMakeARecordString.getText().then((text) => {
                expect(text).toContain("Please make \"A record\" redirect of your domain/subdomain to \"178.62.229.191\" IP address");
            });
        });

        objMap.webInputUrl.sendKeys(domainName).then(()=>{
            objMap.webSubmitButton.click().then(()=>{
               objMap.addDomainNameNotification.getText().then((text) => {
                   expect(text).toContain(`${domainName} domain name added to project successfuly!`);
               });
            });
        });

        objMap.webDeleteDomainButton.click().then(()=>{
            objMap.webDeleteDomainConfirmDesc.getText().then((text) => {
                expect(text).toContain(`${domainName}`);
            });
            objMap.webDeleteDomainConfirmButton.click().then(()=>{
                objMap.addDomainNameNotification.getText().then((text) => {
                    expect(text).toContain(`${domainName} domain name unlinked successfully!`);
                });
            });
        });

    });

    it('Cleanup.tc', () => {
        globalFunc.delete_project(project_name,true);
    });

});