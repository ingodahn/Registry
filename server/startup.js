
Meteor.startup(function () {
    console.log('startup started');
  Meteor.publish("Items", function(itemType) {
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
    switch(current_user_role) {
      case 'admin':
          return items.find({itemType: itemType},{fields: {}});
        break;
      case 'logged_in':
        return items.find(
          {$or: [
            {itemType: itemType, owner: this.userId},
            {itemType: itemType, Status: 'public'},
              {itemType: itemType, Status: 'deprecated'},
          ]},{fields: {}}
        );
        break;
      default:
        return items.find(
          {itemType: itemType, Status: 'public'},{fields: {}}
        );
    }
  });

    Meteor.publish("AllItems", function() {
        var current_user_role='none';
        // var itemType='mathcoach';
        if (this.userId) {
            if (Meteor.users.findOne({_id:this.userId}).username == 'admin') {
                current_user_role = 'admin';
            } else {
                current_user_role = 'logged_in';
            }
        } else {
            current_user_role = 'guest';
        }
        switch(current_user_role) {
            case 'admin':
                return items.find({},{fields: {}});
                break;
            case 'logged_in':
                return items.find(
                    {$or: [
                        {owner: this.userId},
                        {Status: 'public'},
                        {Status: 'deprecated'},
                    ]},{fields: {}}
                );
                break;
            default:
                return items.find(
                    {Status: 'public'},{fields: {}}
                );
        }
    });

  Meteor.publish("Users", function() {
    var userDetails = Meteor.users.find(
      {},{fields: {_id: 1, username: 1}}
    );
    return userDetails;
  });
    console.log('startup complete');
});


