/**
 * Created by melkabelka on 7/14/17.
 */

"use strict";

const viveCommon = function () {

    this.viveAppName    = element(by.model('$ctrl.project.vive.name'));
    this.viveVersion    = element(by.model('$ctrl.project.vive.version'));
    
    this.viveFieldsFill = function  (dispName, version) {
        // set application name
        this.viveAppName.sendKeys(dispName);

        // set application version
        this.viveVersion.sendKeys(version);
    };
};

module.exports = new viveCommon();