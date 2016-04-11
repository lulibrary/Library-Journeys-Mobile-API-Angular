angular.module('libraryJourneys.Api').factory('ContactService', function(Config, $http) {

  var ContactService = function(){};

  ContactService.prototype.sendContactRequest = function(subject, query) {

    params = {
      "contact_request": {
        "subject": subject,
        "query": query
      }
    };

    return $http.post(Config.ApiUrl + '/app/contact_requests', params).then(function(response) {
      return response.data;
    });

  };

  return new ContactService();

});
