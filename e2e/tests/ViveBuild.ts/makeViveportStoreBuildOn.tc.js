/**
 * Created by melkabelka on 7/17/17.
 */

const common = require('../utils/common');
const globalFunc = require('../components/globalFunctions');
const objMap = require('../components/objectMap');
const viveCommon = require('../ViveBuild.ts/viveCommon');
const EC = protractor.ExpectedConditions;


describe('ViveBuild.ts', () => {

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        common.goToUrl('login');
    });

    it('Login_with_existing_cridentals.tc', () => {
        // Login into user account
        globalFunc.isDisplayed_Login_Fields();
        globalFunc.processLogin(common.TESTUSERS[3].username, common.TESTUSERS[3].password, true);
    });
    
    it('Create_project_with_unique_URL.tc', () => {

        // create a new project for vive Build       
        globalFunc.createProject("Interior", 'viveProj', 'viveurl','vive project description', "", true);

    });

    it('makeViveportStoreBuildOn.tc', () => {
     
        // go to created viveProj project's settings
        globalFunc.open_project_settings("viveProj");

        // click on vive tab
        objMap.viveTab.click();

        // swipe viveport trigger
        viveCommon.viveTrigger.click();

        // wait visibility of viveportID
        expect(browser.wait(EC.visibilityOf(viveCommon.viveportID), 5000)).toBe(true);

        // wait visibility of viveportKey
        expect(browser.wait(EC.visibilityOf(viveCommon.viveportKey), 5000)).toBe(true);

    });


    it('Cleanup.tc', () => {

        globalFunc.delete_project("viveProj",true);

        // sign out
        let userMenu = browser.findElement(by.id('accountLabel'));
        userMenu.click();
        let signOut = element(by.className('signout-link'));
        signOut.click();

    });

});