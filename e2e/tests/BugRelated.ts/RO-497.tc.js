/**
 * Created by mhers on 4/13/17.
 */

/**
 Run Part:
 1. Create Project (Github is synced)
 2. Go to settings, Web
 3. Click add custom domian
 4. Publish project
 5. Again click add custom domain
 6. Add custom domain
 7. Open custom domain
 Validate Part:
 1. Check published VR project opened using custom domain
 2. Again open project settings, web and delete custom domain
 3. Delete project
 4. Check there is no errors in console
**/

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');

const EC = protractor.ExpectedConditions;


describe('BugRelated.ts', () => {

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
    domainName = "qa3.rodin.design";

    project_name = common.PROJECTS.Name;
    project_url = common.PROJECTS.URL;
    project_description = common.PROJECTS.Description;

    project_template = 'Video Gallery';

    //TODO Remove after finish
    // project_name = "name4539074";
    // project_url = "url4539074";

    //TODO uncomment after finish
    it('Create_project_with_unique_URL.tc', () => {
        globalFunc.createProject(project_template, project_name, project_url, project_description, "", true);
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

        // click again on Web tab and check yourProjectCurrentURL
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

        // Add Domian name in CustomURL field and check domain added successfully
        objMap.webInputUrl.sendKeys(domainName).then(()=>{
            objMap.webSubmitButton.click().then(()=>{
               objMap.addDomainNameNotification.getText().then((text) => {
                   expect(text).toContain(`${domainName} domain name added to project successfuly!`);
               });
            });
        });


        // open added domain url and check title, script and canvas tags are in web page (VR is activated)
        browser.getCurrentUrl().then((url) => {
            browser.ignoreSynchronization = true;
            browser.get("https://" + domainName).then(()=> {
                browser.ignoreSynchronization = true;
                //title     should be "Rodin | Video Gallery"
                //script    should exist
                //canvas    should exist

                let title = element(by.css('title'));
                let script = element(by.css('script'));
                let canvas = element(by.css('canvas'));

                expect(title.isPresent()).toBe(true);
                expect(title.getAttribute("text")).toContain(`${project_template}`);
                expect(script.isPresent()).toBe(true);

                //TODO check: this tag is not present and returns false, but it is present in source code
                // expect(canvas.isPresent()).toBe(true);
            });

            browser.ignoreSynchronization = false;
            // browser.get(url);
            common.goToUrl('login');

            /*
            browser.driver.sleep(2000);

            setTimeout(function(){
                console.log(url);
                browser.get(url)
            },2000);
            browser.ignoreSynchronization = false;
            */

            globalFunc.open_project_settings(project_name);
            objMap.webTab.click();

            // browser.wait(EC.visibilityOf(objMap.addCustomDomain), 5000);
            // browser.get(url).then(() => {
                objMap.pleaseMakeARecordString.getText().then((text) => {
                    expect(text).toContain("Please make \"A record\" redirect of your domain/subdomain to \"178.62.229.191\" IP address");
                });
            // });

            objMap.webDeleteDomainButton.click().then(()=>{
                objMap.webDeleteDomainConfirmDesc.getText().then((text) => {
                    expect(text).toContain(`${domainName}`);
                });
                objMap.webDeleteDomainConfirmButton.click().then(() => {

                    // TODO wait for notification appear without sleep
                    browser.driver.sleep(2000);
                    objMap.addDomainNameNotification.getText().then((text) => {
                        expect(text).toContain(`${domainName} domain name unlinked successfully!`);
                    });
                });
            });

        });

    });


    it('Cleanup.tc', () => {
        // globalFunc.delete_project(project_name,false);
        console.log("globalFunc.delete_project("+ project_name + ",true);")
    });


});