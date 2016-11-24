const TM = require('../templatemanager');
const vscode = require('vscode');

function editTemplate(){
    TM.getTemplates().then( templatesInfo => {
        let select = vscode.window.showQuickPick(Object.keys(templatesInfo), {
            placeHolder:'Select a template to edit'
        })
        select.then(templateName => {
            if(!templateName){
                // vscode.window.showErrorMessage('Please select a template and retry');
                return;
            }

            vscode.commands.executeCommand('vscode.open', TM.getTemplateURI(templatesInfo[templateName])).then(() => {
                    console.log('Template opened for edit');
                });
        });
    });
}

module.exports = editTemplate;