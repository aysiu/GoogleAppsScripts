function ChangeFileOwnership() {

    // New owner
    var new_owner = 'username@gmail.com';

    // Get all the files in Google Drive for the user running this script
    var files = DriveApp.searchFiles('"me" in owners');

    //// Loop through every file
    while (files.hasNext()) {
        var file = files.next();
        // Assign the file name to a variable
        var file_name = file.getName();
        // Log the name of the file changing ownership
        Logger.log("Changing ownership of " + file_name + " to " + new_owner);
        // Set the owner to be the new owner
        try {
            file.addEditor(new_owner);
        }
        catch(err){
            Logger.log(err.message);
        }
        try { 
            file.setOwner(new_owner);
        }
        catch(err){
         Logger.log(err.message); 
        }
    }
}
