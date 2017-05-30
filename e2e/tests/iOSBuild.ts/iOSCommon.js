/**
 * Created by melkabelka on 5/10/17.
 */

"use strict";

const iOSCommon = function () {

    this.iOSFieldsFill = function  (dispName, version, boundle, devID, prov_profile_path, cert_path, icon_path) {
        // set application name
        element(by.model('$ctrl.project.ios.name')).sendKeys(dispName);
        // set application version
        element(by.model('$ctrl.project.ios.version')).sendKeys(version);
        // set boundle
        element(by.model('$ctrl.project.ios.bundle')).sendKeys(boundle);
        // set developer ID
        element(by.model('$ctrl.project.ios.developerId')).sendKeys(devID);
        // upload provisiioning profile
        browser.findElement(by.id("profile-file")).sendKeys(prov_profile_path);
        // upload certificate
        browser.findElement(by.id("cert-file")).sendKeys(cert_path);
        // upload icon
        browser.findElement(by.id("icon-file")).sendKeys(icon_path);
    };
};

module.exports = new iOSCommon();