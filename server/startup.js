
Meteor.startup(function () {
  Meteor.publish("Items", function() {
    var current_user_role='none';
    if (this.userId) {
      if (Meteor.users.findOne({_id:this.userId}).username == 'admin') {
        current_user_role = 'admin';
      } else {
        current_user_role = 'logged_in';
      }
    } else {
      current_user_role = 'guest';
    }
    console.log(current_user_role);
    switch(current_user_role) {
      case 'admin':
        return items.find({},{fields: {Title: 1, Description: 1, URL: 1, Status: 1, owner:1}});
        break;
      case 'logged_in':
        return items.find(
          {$or: [
            {owner: this.userId},
            {Status: 'public'},
          ]},{fields: {Title: 1, Description: 1, URL: 1, Status: 1, owner:1}}
        );
        break;
      default:
        return items.find(
          {Status: 'public'},{fields: {Title: 1, Description: 1, URL: 1, Status: 1, owner:1}}
        );
    }
  }); 
   
  Meteor.publish("Users", function() {
    var userDetails = Meteor.users.find(
      {},{fields: {_id: 1, username: 1}}
    );
    return userDetails;
  });
});


