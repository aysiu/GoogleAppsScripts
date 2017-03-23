function findUsersWithoutGroups(){
  // In theory, there are simpler ways to do this (for example, instead of creating a separate list of all the students in
  // a group, you could just  if (!grouplist.hasUser(email)) except that if you do that, Google errors out with
  // "Service invoked too many times in a short time: groups read. Try Utilities.sleep(1000) between calls."
  // I also didn't find any API resources (and couldn't figure out based on trial and error) how to combine
  // query items, so that's why I do a separate query for suspended users and then all users for the OU
  // There are lots of great in theory ways to approach this. This script actually works, though. Obviously,
  // you may have to adjust some of this logic to fit your school's organization, but the framework is there...  
  
  // Get the current year and month 
   var thisyear=parseInt(new Date().getFullYear().toString().substr(-2));
   var thismonth=new Date().getMonth();

   // Make an array of years for current students
   if ( thismonth>6 ){
      // After July, start with the year after the current year
      var startyear=thisyear+1;    
   } else {
      // Before July, start with the current year
      var startyear=thisyear;
   }

   // Initialize an array to hold years for current students
   var currentyears=[];

   // Populate the array
   for (var i=0; i<4; i++) {
      var tempyear=startyear+i;
      currentyears.push(tempyear.toString());
   }
  
     // Let's get just the suspended accounts
  var suspendedusers=[];
   var optionalArgs = {
      domain: 'YOURDOMAIN.COM',
      maxResults: 500,
      orderBy: 'email',
      query: 'isSuspended=true'
   };
   var response = AdminDirectory.Users.list(optionalArgs);
   var users = response.users;
   if (users && users.length > 0) {
      for (i = 0; i < users.length; i++) {
         var user = users[i];
         var email = user.primaryEmail.toString();
        suspendedusers.push(email);
        // End looping through suspended users
      }
   // End checking there are suspended users
   }

  
   // Create array just for user emails
   var useremails=[];

   // Loop through each of the current years
   for (var j=0; j<currentyears.length; j++){
      var currentyear=currentyears[j];
      var orgUnitPath='orgUnitPath=/PATH/TO/YOUR/ORGANIZATIONALUNIT' + currentyear;
      // Get all the students
      var optionalArgs = {
         domain: 'YOURDOMAIN.COM',
         maxResults: 500,
         orderBy: 'email'
      };
      // Push another argument just for the query
      optionalArgs['query']=orgUnitPath;

      var response = AdminDirectory.Users.list(optionalArgs);
      var users = response.users;
      if (users && users.length > 0) {
         for (i = 0; i < users.length; i++) {
            var user = users[i];
            var email = user.primaryEmail.toString();
           // Double-check it's not a suspended user
           var userindex=suspendedusers.indexOf(email);
           if(userindex==-1){
             useremails.push(email);
           }
         // End looping through users
         }

         // Create an array to store users in this year's distribution group
         var groupmembers=[];

         // Get all the users in class distribution groups
         var distributiongroup='GROUPPREFIX' + currentyear + '@YOURDOMAIN.COM';
         var grouplist=GroupsApp.getGroupByEmail(distributiongroup).getUsers();
         for (i = 0; i < grouplist.length; i++){
            groupmembers.push(grouplist[i].toString());
         }

         // Loop through the groupmembers and remove them from the original users list
         for (i = 0; i < groupmembers.length; i++){
            // Find the index of the groupmember in the larger original users list
            var tempemail=groupmembers[i];
            var userindex=useremails.indexOf(tempemail);

            // Double-check it exists... it should, but doesn't hurt to double-check
            if(userindex!=-1){
               // Remove it from the larger user list
               useremails.splice(userindex,1);
            }
         // End looping through group members
         }
      // End checking there are users for this year
      }
   // End looping through current years
   }
  
   // Construct email to send
  var recipients="FIRSTPERSON@YOURDOMAIN.COM, SECONDPERSON@YOURDOMAIN.COM";
  var subject='Students unsubscribed from mailing lists';
  var students='';
  for (i=0; i<useremails.length; i++){
    students+=useremails[i] + ' ';
  }
  if (students==''){
    var body='All students are in their respective mailing lists';
  } else {
    var body='The following students are not subscribed to their class mailing lists: ' + students;
  }
    MailApp.sendEmail(recipients, subject, body);
  
 // End of function
 }
