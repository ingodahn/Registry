// Initialization

// Meteor.subscribe("Items");
Meteor.subscribe("Users");

Session.set('adding_item', false);
Session.set('mode', 'home');
Session.set('current_item',null);
Session.set('search_term','');

getUserLanguage = function() {
  var userLang = navigator.language || navigator.userLanguage; 
  // console.log("Language: "+userLang);
  return userLang;
}

Meteor.startup(function () {
  Session.set('showLoadingIndicator',true);
  TAPi18n.setLanguage(getUserLanguage()).done(function () {
    Session.set('showLoadingIndicator',false);
    // console.log("Success");
    })
    .fail(function(error_message) {
      console.log(error_message);
    });
});
