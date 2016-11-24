let vscode = require('vscode');
const editTemplate = require('./commands/edittemplate');
const newTemplate = require('./commands/newtemplate');
const newFileFromTemplate = require('./commands/newfilefromtemplate');

function activate(context) {

    /**
     * Create a new Template from file
     */
    let disposable = vscode.commands.registerCommand('template.newTemplateFromFile', newTemplate.newTemplateFromFile);
    context.subscriptions.push(disposable);


    /**
     * Create a new Template
     */
    disposable = vscode.commands.registerCommand('templates.newTemplate', newTemplate.newTemplate);


    /**
     * Edit a template
     */
    disposable = vscode.commands.registerCommand('templates.editTemplate', editTemplate);
    context.subscriptions.push(disposable);


    /**
     * Create a new file from template
     */
    disposable = vscode.commands.registerCommand('templates.newFileFromTemplate', newFileFromTemplate);
    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;