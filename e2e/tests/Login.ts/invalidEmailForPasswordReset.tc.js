/**
 * Created by melkabelka on 9/10/17.
 * Updated by melkabelka on 10/17/17.
 */

const common = require('../utils/common');
const objMap = require('../components/objectMap');
const EC = protractor.ExpectedConditions;

describe('Login.ts', () => {

    beforeEach(() => {
        common.goToUrl('login');
    });

    it('invalidEmailForPasswordReset.tc', () => {
        
        // click on forgot password link
        objMap.forgetPswdLink.click();

        // type non existing user email
        objMap.resetPassEditBox.sendKeys(common.TESTUSERS[1].email);
        
        // click on Submit button
        objMap.submitBtn.click();

        // check error
        browser.wait(EC.textToBePresentInElement(objMap.notificationsArray.get(0).getText(), "User doesn't exist"), 5000);
        expect(objMap.notificationsArray.count()).toBe(1);
    });

});