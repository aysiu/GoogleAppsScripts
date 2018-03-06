function eventsForToday() {
  
  // Calendar ID of A/V Calendar
  var calendarId='FILLINTHEIDOFYOURGOOGLECALENDAR';

  // Who should get the email of the results
  var recipients='PERSON@ORGANIZATION.COM';

  // What is the subject of the email you want to send
  var subject='These are the events for today';
  
  // Get the calendar based on the ID
  var calendar = CalendarApp.getCalendarById(calendarId);

  // The begin date is today right now... no end date
  var beginDate = new Date(Date.now());

  // Get the calendar events for today  
  var calEvents = calendar.getEventsForDay(beginDate);

  // Set up an empty email body we'll fill in later with information
  var body='';

  // Loop through calendar events for today
  for (var j = 0; j < calEvents.length; j++) {
    // Set local variable for this particular event
    var calEvent = calEvents[j];
    // Get the other relevant info about the event
    var calEventDateCreated = calEvent.getDateCreated();
    var calDescription = calEvent.getDescription();
    var calTitle = calEvent.getTitle();
    var calStart = calEvent.getStartTime();
    var calEnd = calEvent.getEndTime();
    var calEventCreator = calEvent.getCreators();

    // Add info to the body of the email
    body+='Title: ' + calTitle + '\nDescription: ' + calDescription + '\nStart: ' + calStart + '\nEnd:  ' + calEnd + '\nDate Created: ' + calEventDateCreated + '\nCreator(s): ' + calEventCreator + '\n\n';

  }

  // Placeholder text if there are no events
  if(body==''){
    
    body='There are no events today';
    
  }
  
  // Send an email of the results (or lack of results)
  MailApp.sendEmail(recipients, subject, body);
  
}
