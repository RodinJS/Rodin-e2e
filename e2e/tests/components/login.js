/**
 * Created by xgharibyan on 3/23/17.
 */
"use strict";

const uitls = require('../utils/common');

const View = function () {
    this.LoginContainer = element(by.css('.sign-in'));
    this.userNameField  = this.LoginContainer.element(by.model('$ctrl.formData.username'));
    this.passwordField  = this.LoginContainer.element(by.model('$ctrl.formData.password'));
    this.loginButton    = this.LoginContainer.element(by.css('.btn-submit'));
    this.wrongCredentials = this.LoginContainer.element(by.css('.text-wrong'));

    this.dashboardContainer         = element(by.css('.page-dashboard'));
    this.dashboardAccountWrapper    = this.dashboardContainer.element(by.css('.hidden-xs'));

    this.isDisplayed = function () {
        expect(this.LoginContainer.isDisplayed()).toBe(true);
        expect(this.userNameField.isDisplayed()).toBe(true);
        expect(this.passwordField.isDisplayed()).toBe(true);
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
    }
};

module.exports = new View();