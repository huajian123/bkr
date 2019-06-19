import {
    apply, chain, FileEntry, forEach,
    MergeStrategy,
    mergeWith,
    move, noop,
    Rule,
    SchematicContext,
    template,
    Tree,
    url
} from '@angular-devkit/schematics';
import {join, normalize} from 'path';
import {getWorkspace} from '@schematics/angular/utility/config';
import {classify, dasherize} from "@angular-devkit/core/src/utils/strings";
// import {addModuleImportToRootModule, getProjectFromWorkspace} from "schematics-utilities";

const stringUtils = {dasherize, classify};

export function addModuleToImports(options: any): Rule {
    return (host: Tree, context: SchematicContext) => {
        //const workspace = getWorkspace(host);
        /*const project = getProjectFromWorkspace(
            workspace,
            options.project ? options.project : Object.keys(workspace['projects'])[0]
        );*/
        const moduleName = classify(options.name)+'Module';

        // 添加模块到根module
        // addModuleImportToRootModule(host, moduleName, './views/'+dasherize(options.name)+'/'+dasherize(options.name)+'.module', project);
        context.logger.log('info', `"${moduleName}" 模块添加成功`);

        return host;
    };
}

export function setupOptions(host: Tree, options: any): Tree {
    const workspace = getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    options.path = join(normalize(project.root), 'src');
    return host;
}

export function bkrModule(_options: any): Rule {
    const rule1 = (tree: Tree, _context: SchematicContext) => {
        setupOptions(tree, _options);
        const movePath = normalize(_options.path + '/');
        const templateSource = apply(url('./files/src'), [
            template({...stringUtils, ..._options}),
            move(movePath),
            forEach((fileEntry: FileEntry) => {
                if (tree.exists(fileEntry.path)) {
                    tree.overwrite(fileEntry.path, fileEntry.content);
                }
                return fileEntry;
            }),
        ]);
        const rule = mergeWith(templateSource, MergeStrategy.Overwrite);
        return rule(tree, _context);
    };
    const rule2 = _options && _options.skipModuleImport ? noop() : addModuleToImports(_options);
    return chain([rule1, rule2]);
}
