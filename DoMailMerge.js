function do_mail_merge() {
    /*
        This is for a mail merge (not an email merge), but rather than creating an
        entirely new document with each merge, this just appends all merged data
        to the same new document for each row of data in the spreadsheet    
    */
    /// User-defined variables
    // ID of Google Doc template with merge fields to be replaced
    var old_doc_id = 'FILLINIDOFGOOGLEDOCTEMPLATE';

    // Name for new Google doc with merged-in data from spreadsheet
    var new_doc_name = 'WHATYOUWANTTOCALLTHENEWMERGEDFILE';

    // Name of the tab/sheet on the spreadsheet where the data is
    // This might be called something like SHEET1
    var sheet_name = 'NAMEOFSHEETINSPREADSHEET';
    //// End of user-defined variables

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ss_sheet = ss.getSheetByName(sheet_name);
    var range = ss_sheet.getDataRange();
    var values = range.getValues();
    var columnlength = range.getLastColumn();

    // Create a blank document
    var new_doc = DocumentApp.create(new_doc_name);

    // Get the ID of the newly created document
    var new_doc_id = new_doc.getId();

    // Open the old document
    var old_doc = DocumentApp.openById(old_doc_id);

    // Open the new document
    var new_doc = DocumentApp.openById(new_doc_id);

    // Loop through the values in the spreadsheet
    for ( j = 0; j < values.length; j++){
        // If it's the first row, get the header names
        if (j == 0){
            // Create an array of header name
            header_names = new Array;
            for (k = 0; k < columnlength; k++){
                header_names.push('{{' + values[j][k] + '}}');
            }
        // If it's the second or later rows, process the data
        } else {
            Logger.log('Writing old template to new file')
            // Get the body of the old document in focus
            var old_body = old_doc.getActiveSection();
            /* Get the body of the new document in focus
            Re-opening and re-saving the new document is terribly inefficient, but
            in case there's a timeout running the Google Apps Script, we want to have
            at least an incomplete document instead of a totally empty document
            */
            var new_body = new_doc.getActiveSection();
            // This loop adapted from https://stackoverflow.com/a/54818291
            for(var m=0; m<old_body.getNumChildren();m++){
                //run through the elements of the template doc's Body.
                switch (old_body.getChild(m).getType()) {
                    //Deal with the various types of Elements we will encounter and append.
                    case DocumentApp.ElementType.PARAGRAPH:
                        new_body.appendParagraph(old_body.getChild(m).copy());
                        break;
                    case DocumentApp.ElementType.LIST_ITEM:
                        new_body.appendListItem(old_body.getChild(m).copy());
                        break;
                    case DocumentApp.ElementType.TABLE:
                        new_body.appendTable(old_body.getChild(m).copy());
                        break;
                }
            }
            Logger.log('Processing row ' + j);
            // Loop through the header names and make replacements
            for (l = 0; l < header_names.length; l++){
                Logger.log('Replacing ' + header_names[l] + ' with ' + values[j][l]);
                new_body.replaceText(header_names[l], values[j][l]);
            // End of making replacements
            }
            // Close the new doc
            new_body.saveAndClose;
        // End of processing non-header rows
        }
    // End of looping through all rows of the spreadsheet
    }
// End of function
}
