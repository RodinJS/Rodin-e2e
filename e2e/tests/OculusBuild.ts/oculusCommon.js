/**
 * Created by melkabelka on 7/14/17.
 */

"use strict";

const oculusCommon = function () {

    this.oculusAppName    = element(by.model('$ctrl.project.oculus.name'));
    this.oculusVersion    = element(by.model('$ctrl.project.oculus.version'));
    
    this.oculusFieldsFill = function  (dispName, version) {
        // set application name
        this.oculusAppName.sendKeys(dispName);

        // set application version
        this.oculusVersion.sendKeys(version);
    };
};

module.exports = new oculusCommon();