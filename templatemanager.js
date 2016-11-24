const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const templatesDir  = path.join(__dirname, 'templates');
const workspaceTemplatesDir  = path.join(vscode.workspace.rootPath,'.vscode', 'templates');

function createTemplatesDirIfNotExists(){
    return new Promise((resolve, reject) => {
        fs.stat(templatesDir, (err, stats) => {
            if(err || !stats.isDirectory())
                fs.mkdir(templatesDir, () => {
                    resolve();
                });
            else
                resolve();
        });
    });
}

class TemplateManager{
    getTemplates(){
        return new Promise((resolve, reject) => {
            createTemplatesDirIfNotExists().then(() => {
                fs.readdir(templatesDir, (err, files) => {
                    if(err){
                        reject(err);
                        return;
                    }

                    let templates = {};
                    files.forEach( file => {
                        let baseName = file.substring(0, file.lastIndexOf('.'));
                        if(baseName)
                            templates[baseName] = path.join(templatesDir, file);
                    });

                    fs.readdir(workspaceTemplatesDir, (err, files) => {
                        if(!err)
                        {
                            files.forEach( file => {
                                let baseName = file.substring(0, file.lastIndexOf('.'));
                                if(baseName)
                                    templates[baseName] = path.join(workspaceTemplatesDir, file);
                            });   
                        }

                        resolve(templates);
                    });
                });
            });
        });
    }

    getTemplatePath(templateName){
        return path.join(templatesDir, templateName);
    }

    getTemplateURI(templatePath){
        return vscode.Uri.parse('file://' + templatePath);
    }
}

module.exports = new TemplateManager();