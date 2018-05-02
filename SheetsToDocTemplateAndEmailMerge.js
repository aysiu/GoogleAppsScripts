function SheetsToDocTemplateAndEmailMerge() {
  var ss = SpreadsheetApp.openById('IDOFSPREADSHEET');
  var ss_sheet = ss.getSheetByName("NAMEOFWORKSHEETONSPREADSHEET");
  var range = ss_sheet.getDataRange();
  var values = range.getValues();

  // Start your loop
  for ( j = 0; j < values.length; j++){
    
    var first_name = values[j][0];
    var last_name = values[j][1];
    var email = values[j][2];
    var uniquething = values[j][3];
    
    var new_doc_name = 'NEWNAMEOFTEMPLATE FOR ' + first_name + ' ' + last_name;
    
    // Make a copy and get the ID of the new document
    var docid = DriveApp.getFileById('IDOFGOOGLEDOCSTEMPLATEFILE').makeCopy(new_doc_name).getId();

    // Open the new document
    var doc = DocumentApp.openById(docid);

    // Get the body of the document in focus
    var body = doc.getActiveSection();

    // Replace text in the document with whatever custom text
    body.replaceText("PLACEHOLDTEXTTOREPLACEWITHEMAIL", email);
    body.replaceText("PLACEHOLDTEXTTOREPLACEWITHUNIQUETHING", uniquething);

    // Add an editor to the document besides you
    doc.addEditor(email);

    // Save the doc and close it
    doc.saveAndClose();
    
    // The address of the recipient
    var emailRecipient = email;

    // The actual body text of the email, in which you can use HTML
    var emailText = "<p>SOME VERY IMPORTANT MESSAGE TO THE USER AND HERE'S A LINK TO <a href=\"https://docs.google.com/document/d/" + docid + "/edit\">TEXT FOR LINK</a></p>";

    // The email subject
    var emailSubject = "SUBJECTFORTHEEMAIL";

    // Send the email
    GmailApp.sendEmail(emailRecipient, emailSubject, emailText, {htmlBody: emailText, name: "HOWYOUWANTYOURSENDERNAMETOAPPEAR"});    
    
  }
}
