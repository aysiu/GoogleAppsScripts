function FindPasswordChangeInfo() {

/* Start of user-defined variables */
    // The year you're looking for
    var currentyear=21;
    
    // Organizational unit to query
    var orgUnitPath='orgUnitPath=/PATH/TO/YOUR/ORGANIZATIONAL/UNIT' + currentyear;

    // Who should get the email of the results
    var recipients="RECIPIENT@YOUR.ORG";

    // What is the subject of the email you want to send
    var subject='These are the flags for students in 20' + currentyear;

    // Domain name to query
    var optionalArgs = {
        domain: 'YOUR.ORG',
        maxResults: 500,
        orderBy: 'email'
    };

/* End of user-defined variables */

    // Push organizational unit path to the query array
    optionalArgs['query']=orgUnitPath;

    // Get the users based on those previously defined options
    var response = AdminDirectory.Users.list(optionalArgs);
    var users = response.users;

    // Set up an empty email body we'll fill in later with information
    var body='';

    // If there are any results, proceed...
    if (users) {

        // Loop through the users we found
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            
            // Add the information to the the body of the email
            body+=user.name.fullName + ' ' + user.changePasswordAtNextLogin + '\n';
        }

    // If there aren't any users...
    } else {
        // Send that in the email
        body+='No users found.';
    }

    // Send an email of the results (or lack of results)
    MailApp.sendEmail(recipients, subject, body);

}
