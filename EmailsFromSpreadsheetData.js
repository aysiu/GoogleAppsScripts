function emailFromSpreadsheet() {

  // Set up the email to be sent later
  // The actual body text of the email, in which you can use HTML
  var emailText = "<p>FILLINTEXTOFEMAIL</p>";

  // The email subject
  var emailSubject = "FILLINEMAILSUBJECTTEXT";

  // Get the contents of the spreadshet
  var ss = SpreadsheetApp.openById('FILLINSPREADSHEETIDHERE');
  var ss_sheet = ss.getSheetByName('FILLINSPREADSHEETNAMEHERE');
  var range = ss_sheet.getDataRange();
  var values = range.getValues();
  
  // Loop through rows, but skip the first (0) row, which is the header row
  for (i = 1; i < values.length; i++) {
    // Set the first column to be the email recipient
    var emailRecipient = values[i][0];
    
    // Append the second and third columns to be part of the email text
    emailText += values[i][1] + '<br />' + values[i][2];
    
    // Send the email
    GmailApp.sendEmail(emailRecipient, emailSubject, emailText, {htmlBody: emailText, name: "FILLINHOWYOUWANTYOURSENDERNAMETOAPPEAR"});
    
  }
   
}
