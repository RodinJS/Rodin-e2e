/**
 * Created by melkabelka on 7/14/17.
 */

"use strict";

const viveCommon = function () {

    this.viveAppName    = element(by.model('$ctrl.project.vive.name'));
    this.viveVersion    = element(by.model('$ctrl.project.vive.version'));
    this.viveTrigger	= element(by.className('blue switch blue ng-not-empty ng-valid'));
    this.viveportID		= element(by.model('$ctrl.project.vive.viveportId'));
    this.viveportKey	= element(by.model('$ctrl.project.vive.viveportKey'));
    
    this.viveFieldsFill = function  (dispName, version, isForVivePort = false, viveportID = '', viveportKey='') {
        
    	if(isForVivePort)
    	{
    		this.viveportID.sendKeys(viveportID);
    		this.viveportKey.sendKeys(viveportKey);
    	}
        // set application name
        this.viveAppName.sendKeys(dispName);

        // set application version
        this.viveVersion.sendKeys(version);
    };
};

module.exports = new viveCommon();