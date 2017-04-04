describe('Test to print out jasmine version', () => {
    it('prints jasmine version', () => {
        console.log('jasmine-version:' + jasmine.version || (jasmine.getEnv().versionString && jasmine.getEnv().versionString()));
    });
});