/**
 * Created by melkabelka on 7/7/17.
 */

"use strict";

const AndroidCommon = function () {

    this.AndroidAppName    = element(by.model('$ctrl.project.android.name'));
    this.AndroidVersion    = element(by.model('$ctrl.project.android.version'));
    this.AndroidPackage    = element(by.model('$ctrl.project.android.package'));
    this.Name              = element(by.model('$ctrl.project.android.keyStore.name'));
    this.Alias             = element(by.model('$ctrl.project.android.keyStore.alias'));

    this.AndroidFieldsFill = function  (dispName, version, package, name, alias, icon_path) {
        // set application name
        this.AndroidAppName.sendKeys(dispName);
        // set application version
        this.AndroidVersion.sendKeys(version);
        // set package
        this.AndroidPackage.sendKeys(package);
        // set developer name
        this.Name.sendKeys(name);
        // set alias
        this.Alias.sendKeys(alias);
        // upload icon
        browser.findElement(by.id("icon-file")).sendKeys(icon_path);
    };
};

module.exports = new AndroidCommon();