function makeExternalAPICall() {
    // Relevant link: https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app

    // Username and password if you need to do basic auth to do the GET request
    var username = 'FILLINUSERNAMEHERE';
    var password = 'FILLINPASSWORDHERE';

    // URL to run GET request on
    var url = 'https://SUBDOMAIN.TOPLEVELDOMAIN.COM/FULL/PATH/TO/REST/OF/URL';

    // Headers to do basic auth and ask for .json returned response
    var headers = {
        // You may need to base64-encode the credentials - consult your API documentation
        "Authorization" : "Basic " + Utilities.base64Encode(username + ':' + password),
        // You can change this to application/xml if that's the kind of response you want
        "Accept": "application/json"
    };

    // Use headers in parameters
    var params = {
        "method" : "GET",
        "headers" : headers
    };

    // Get the response from the API server
    var response = UrlFetchApp.fetch(url, params);

    // Show the full .json response in the logs
    Logger.log(response);

    // If the response is a .json, parse the .json (obviously won't work for XML)
    var data = JSON.parse(response.getContentText());

    // Show info from the parsed .json
    // Adjust FIRSTKEY, SECONDKEY, THIRDKEY to show the actual drilled-down keys you want
    Logger.log(data.FIRSTKEY.SECONDKEY.THIRDKEY);
}
