"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const path = require("path");
describe('bkr-service', () => {
    const collectionPath = path.join(__dirname, '../collection.json');
    const schematicRunner = new testing_1.SchematicTestRunner('schematics', path.join(__dirname, './../collection.json'));
    const workspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '0.5.0',
    };
    const appOptions = {
        name: 'schematest'
    };
    const schemaOptions = {
        name: 'foo'
    };
    let appTree;
    beforeEach(() => {
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
        appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
    });
    it('works', () => {
        const runner = new testing_1.SchematicTestRunner('schematics', collectionPath);
        runner.runSchematicAsync('bkr-service', schemaOptions, appTree).toPromise().then(tree => {
            const appComponent = tree.readContent('/projects/schematest/src/app/app.component.ts');
            expect(appComponent).toContain(`name = '${schemaOptions.name}'`);
        });
    });
});
//# sourceMappingURL=index_spec.js.map