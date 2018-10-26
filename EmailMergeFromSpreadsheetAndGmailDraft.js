// Add the script to the menu so it's easily clickable
function onOpen() {
	var currentspreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var menuEntries=[{name: "Run Email Merge", functionName: "do_email_merge" }];
	currentspreadsheet.addMenu("Scripts", menuEntries);
}

// The actual email merge
function do_email_merge() {
	
	// Get data from the spreadsheet
	// This would be https://docs.google.com/spreadsheets/d/SUBSTITUTEINTHEIDOFTHESPREADSHEETYOUWANTTOUSE/
	var ss = SpreadsheetApp.openById("SUBSTITUTEINTHEIDOFTHESPREADSHEETYOUWANTTOUSE");
	// This would be the actual name (not ID) of the worksheet within the spreadsheet. It should have a first column of the first name, second column of the last name, and third column of the email address
	var ss_sheet = ss.getSheetByName("SUBSTITUTEINTHENAMEOFTHEWORKSHEETYOUWANTTOUSE");
	var range = ss_sheet.getDataRange();
	var values = range.getValues();

// Make sure there's at least one email address line in the spreadsheet
// Doesn't actually validate that the email address is a valid email, though
	if(values.length>1){

		// Get all the available drafts for this Gmail account we'll be sending from
		var drafts = GmailApp.getDrafts();

		// Make sure there is only one draft in the drafts folder
		if(drafts.length == 1){

			// Now that we know there's only one draft in there, let's get the first draft message in your drafts folder
			var draft = drafts[0];

			// Get its ID
			var draftId = draft.getId();

			// Now fetch the same draft using that ID.
			var draftById = GmailApp.getDraft(draftId);

			// Get the message
			var draftMessage=draftById.getMessage();

			// Get the subject
			var email_subject=draftMessage.getSubject();

			// Get the body
			var email_body=draftMessage.getBody();
			var email_plain_body=draftMessage.getPlainBody();

			// Loop through the data we fetched earlier
			for(r=1; r<values.length; r++){
				// Assign variables to values from cells
				var first_name=values[r][0];
				var last_name=values[r][1];
				var email_address=values[r][2];

				// Personalize the body of the message for this person
				var email_body_personalized=email_body.replace("FIRSTNAMEGOESHERE", first_name).replace("LASTNAMEGOESHERE", last_name);
				var email_plain_body_personalized=email_body.replace("FIRSTNAMEGOESHERE", first_name).replace("LASTNAMEGOESHERE", last_name);

				// Send the email
				GmailApp.sendEmail(email_address, email_subject, email_plain_body_personalized, {htmlBody: email_body_personalized, name: "YOURFROMNAME"});
			}
		} else {
			ss.toast("You must have exactly one draft in your drafts folder. You cannot have 0 or 2 or more than 2."); 
		}
	} else {
	 	s.toast("You have to have at least one row of people to email.");
	}
}
