"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const config_1 = require("@schematics/angular/utility/config");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const stringUtils = { dasherize: strings_1.dasherize, classify: strings_1.classify };
// export function addModuleToImports(options: any): Rule {
//     return (host: Tree, context: SchematicContext) => {
//         /* const workspace = getWorkspace(host);
//          const project = getProjectFromWorkspace(
//              workspace,
//              // Takes the first project in case it's not provided by CLI
//              options.project ? options.project : Object.keys(workspace['projects'])[0]
//          );*/
//
//         buildComponent(options);
//         context.logger.log('info', `✅️ "" is 搞定`);
//
//         return host;
//     };
// }
function setupOptions(host, options) {
    const workspace = config_1.getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    options.path = path_1.join(path_1.normalize(project.root), 'src');
    return host;
}
exports.setupOptions = setupOptions;
function bkrList(_options) {
    const rule1 = (tree, _context) => {
        setupOptions(tree, _options);
        const movePath = path_1.normalize(_options.path + '/');
        const templateSource = schematics_1.apply(schematics_1.url('./files/src'), [
            schematics_1.template(Object.assign({}, stringUtils, _options)),
            schematics_1.move(movePath),
            schematics_1.forEach((fileEntry) => {
                if (tree.exists(fileEntry.path)) {
                    tree.overwrite(fileEntry.path, fileEntry.content);
                }
                return fileEntry;
            }),
        ]);
        const rule = schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite);
        return rule(tree, _context);
    };
    // const rule2 = _options && _options.skipModuleImport ? noop() : addModuleToImports(_options);
    return schematics_1.chain([rule1]);
}
exports.bkrList = bkrList;
//# sourceMappingURL=index.js.map