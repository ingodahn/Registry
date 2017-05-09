import { Meteor } from 'meteor/meteor';
//import '../both/startup.js';
//import './startup.js';

// Meteor.startup(() => {
  // code to run on server at startup
//});

// Permissions
/* checks to see if the current user making the request to update is the admin user */

function adminUser(userId) {
  var adminUser = Meteor.users.findOne({username: "admin"});
  return (userId && adminUser && userId === adminUser._id);
}

items.allow({
  insert: function(userId, doc) {
    return (adminUser(userId) || (userId && doc.owner === userId));
  },
  update: function(userId, docs, fields, modifier) {
  console.log('checking update');
    return (adminUser(userId) || (userId && docs.owner === userId));
  },
  remove: function(userId,docs) {
    return (adminUser(userId) || (userId && docs.owner === userId));
  }
});
