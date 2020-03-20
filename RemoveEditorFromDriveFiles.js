function RemoveEditorFromDriveFiles() {
    // Editor to remove
    var editor_to_remove = 'oldeditor@gmail.com';

    // Protected file - the Change File Ownership Google Apps Script
    var protected_file = 'ChangeFileFolderOwnership.js';
    
    // Get all the files in Google Drive for the user running this script
    var files = DriveApp.searchFiles('"me" in owners');

    // Loop through all the files
    while (files.hasNext()) {
        var file = files.next();
        // Get editors of file
        var file_editors = file.getEditors();
        // Assign the file name to a variable
        var file_name = file.getName();
        // Double-check it's not the protected file named before
        if(file_name != protected_file){
            // Loop through the editors
            for (index = 0; index < file_editors.length; index++) { 
                var editor = file_editors[index];
                var editor_email = editor.getEmail();
                if (editor_email == editor_to_remove){
                    // Log the name of the file changing ownership
                    Logger.log("Removing " + editor_to_remove + " as editor from " + file_name);
                    try {
                        file.removeEditor(editor_to_remove);
                    }
                    catch(err){
                        Logger.log(err.message); 
                    }
                }
            }
        } else {
            Logger.log("Not removing " + editor_to_remove + " as editor from protected file " + file_name);
        }
    }
}
