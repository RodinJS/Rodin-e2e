/**
 * Created by mhers on 7/25/17.
 */

/**
 Run Part:
 1. Create Project (Github is synced)
 2. Open project settings and publish it
 3. Open Web section
 4. Add wrong custom domain
 Validate Part:
 1. Check notification for wrong custom domain
 2. Delete Wrong custom domain
 3. Delete project
 4. Check there is no errors in console
**/

// Animast test case

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;


describe('WebSection.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = false;
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
    });

    user_name = common.USERS.MherS.username;
    url = common.CONSTANTS.spaceURL;

    //TODO this variable should be added in constants
    domainName = "wrong.rodin.design";

    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;

    project_template = 'Video Gallery';

    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject(project_template, project_name, project_url, project_description, "", true);
    });

    // TODO All strings should be added in golden constants
    it('AddNotExistingCustomDomain.tc', () => {

        // go to created project's settings
        globalFunc.open_project_settings(project_name);

        // click on publish tab
        objMap.publishTab.click().then(()=>{
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

        // Click on Add custom domain checkbox
        objMap.addCustomDomain.click().then(()=> {
            objMap.pleaseMakeARecordString.getText().then((text) => {
                expect(text).toContain("Please make \"A record\" redirect of your domain/subdomain to \"178.62.229.191\" IP address");
            });
        });

        // TODO Wrong domain should not be added successfully: May be should be fixed in future
        // Add Wrong Domian name in CustomURL field and check domain added successfully
        objMap.webInputUrl.sendKeys(domainName).then(()=>{
            objMap.webSubmitButton.click().then(()=>{
                objMap.addDomainNameNotification.getText().then((text) => {
                    expect(text).toContain(`${domainName} domain name added to project successfuly!`);
                });
            });
        });

        // open added domain url and check
        browser.getCurrentUrl().then((url) => {
             browser.ignoreSynchronization = true;
             browser.get("https://" + domainName).then(()=> {
                 browser.ignoreSynchronization = true;
                 //abbr      should exist and title should be "DNS is the network service that translates a website’s name to its Internet address."

                 let abbr = element(by.css('abbr'));

                 expect(abbr.isPresent()).toBe(true);
                 expect(abbr.getAttribute("title")).toContain("DNS is the network service that translates a website’s name to its Internet address.");

                 browser.ignoreSynchronization = false;
             });
        });

    });

    it('Cleanup.tc', () => {
        common.goToUrl('login');
        // TODO Add logic to login with criudentals in case of user has not already been logged in.
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.USERS.MherS.username, common.USERS.MherS.password, true);
        globalFunc.delete_project(project_name,true);
    });
});