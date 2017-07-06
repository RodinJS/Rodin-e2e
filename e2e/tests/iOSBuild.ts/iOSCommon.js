/**
 * Created by melkabelka on 5/10/17.
 */

"use strict";

const iOSCommon = function () {

    this.iOSAppName    = element(by.model('$ctrl.project.ios.name'));
    this.iOSVersion    = element(by.model('$ctrl.project.ios.version'));
    this.iOSBundle     = element(by.model('$ctrl.project.ios.bundle'));
    this.developerId   = element(by.model('$ctrl.project.ios.developerId'));

    this.iOSFieldsFill = function  (dispName, version, boundle, devID, prov_profile_path, cert_path, icon_path) {
        // set application name
        this.iOSAppName.sendKeys(dispName);
        // set application version
        this.iOSVersion.sendKeys(version);
        // set boundle
        this.iOSBundle.sendKeys(boundle);
        // set developer ID
        this.developerId.sendKeys(devID);
        // upload provisiioning profile
        browser.findElement(by.id("profile-file")).sendKeys(prov_profile_path);
        // upload certificate
        browser.findElement(by.id("cert-file")).sendKeys(cert_path);
        // upload icon
        browser.findElement(by.id("icon-file")).sendKeys(icon_path);
    };
};

module.exports = new iOSCommon();