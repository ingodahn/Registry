// Imports 

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import '../main.html';
//import '../../imports/startup/startup.js';

// Helpers and Events

// header

Template.header.helpers({
  current_item: function() {
    if (Session.equals('current_item',null)) {
      return null;
    } else {
      return Session.get('current_item');
    }
  },
  get_item_field(id,field) {
    if (id) {
      return items.findOne({_id: id})[field];
    }
    return 'field not found';
  }
});

// mode

Template.mode.helpers({
  logged_in: function() {
    if (! Meteor.userId()) {
      return false;
    } else {
      return true;
    }
  }
});

Template.mode.events({
  'click #btnAdd': function(e,t) {
    Session.set('mode','adding');
  },
  'click #btnAll' : function(e,t) {
    Session.set('search_term','');
    t.find('#search_term').value='';
  },
  'keyup #search_term' : function(e,t) {
    Session.set('search_term',t.find('#search_term').value);
  }
});

// content

Template.content.helpers({
  new_item: function() {
    return (Session.equals('mode', 'adding'));
  },
  current_item: function() {
    return Session.get('current_item');
  }
});

// add_item

Template.add_item.events({
  'click #btnSaveNewItem': function(e,t) {
    let title=t.find('#add-title').value;
    let description=t.find('#add-description').value;
    let url=t.find('#add-url').value;
    let status=t.find('#add-status').value;
    console.log(title);
    console.log(description);
    console.log(url);
    console.log(status);
    if (title == "") {
      alert('Das Titel-Feld darf nicht leer sein.');
    } else if (description == "") {
      alert('Das Beschreibungs-Feld darf nicht leer sein.');
    } else  if (url == "") {
      alert('Das URL-Feld darf nicht leer sein');
    } else {
      items.insert({
        Title: title, 
        Description: description, 
        URL: url,
        Status: status,
        owner: Meteor.userId()
      });
      Session.set('mode','home');
    }
  },
  'click #btnCancelNewItem': function(e,t) {
    Session.set('mode','home');
  }
});

// item_details

Template.item_details.helpers({
  current_title: function() {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    return items.findOne({_id: item_id}).Title;
  },
  current_description: function() {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    return items.findOne({_id: item_id}).Description;
  },
  current_url: function() {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    return items.findOne({_id: item_id}).URL;
  },
  current_owner: function() {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    owner_id = items.findOne({_id: item_id}).owner;
    return Meteor.users.findOne({_id: owner_id}).username;
  },
  selected_status: function(s) {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    let status = items.findOne({_id: item_id}).Status;
    if (status == s) {
      return 'selected';
    }
    return '';
  },
  current_status: function() {
    let item_id = Session.get('current_item');
    if (! item_id) {
      return '';
    }
    let status = items.findOne({_id: item_id}).Status;
    return status;
  },
  can_modify: function () {
    if (! Meteor.userId()) {
      return false;
    }
    let item_id = Session.get('current_item');
    let owner_id = items.findOne({_id: item_id}).owner;
    if (Meteor.userId() == owner_id) {
      return true;
    }
    if (Meteor.users.findOne({_id: Meteor.userId()}).username == 'admin') {
      return true;
    }
    return false;
  },
  is_admin: function() {
    if (! Meteor.userId()) {
      return false;
    }
    if (Meteor.users.findOne({_id: Meteor.userId()}).username == 'admin') {
      return true;
    }
    return false;
  },
  users: function() {
    return Meteor.users.find({})
  },
  selected_user: function() {
    let item_id = Session.get('current_item');
    if (items.findOne({_id: item_id}).owner == this._id) {
      return 'selected';
    } 
    return '';
  }
});

Template.item_details.events({
  'click #btnSaveChangeItem': function(e,t) {
  try {
    let title=t.find('#item-title').value;
    let description=t.find('#item-description').value;
    let url=t.find('#item-url').value;
    let status=t.find('#status').value;
    let owner_select=t.find('#owner');
    if (title == "") {
      alert('Das Titel-Feld darf nicht leer sein.');
    } else if (description == "") {
      alert('Das Beschreibungs-Feld darf nicht leer sein.');
    } else  if (url == "") {
      alert('Das URL-Feld darf nicht leer sein');
    } else {
      let this_id=Session.get('current_item');
      if (owner_select) {
        let owner_value = owner_select.value;
        items.update(this_id,{$set: {Title: title, Description: description, URL: url, Status: status, owner: owner_value}});
      } else {
        items.update(this_id,{$set: {Title: title, Description: description, URL: url, Status: status}});
      }
      Session.set('mode','home');
      Session.set('current_item',null);
    }
  } catch(err) {
    console.log(err.message);
  }
  },
  'click #btnCancelChangeItem': function(e,t) {
    Session.set('mode','home');
    Session.set('current_item',null);
  },
  'click .delete_item': function(e,t) {
    let this_id=Session.get('current_item');
    items.remove({_id: this_id});
    Session.set('current_item',null);
  }
});

// item_list

Template.item_list.helpers({
  items : function(){
    let search_term=Session.get('search_term');
    
    return items.find(
      {$or: [
        {Title: {$regex: search_term, $options: 'i' }},
        {Description: {$regex: search_term, $options: 'i' }}
      ]}, 
      { sort: {Title : 1}}
    );
  },
  doc_owner: function() {
    if (Meteor.userId() == this.owner) {
      return 'Mine';
    } else {
      var owner= Meteor.users.findOne({_id: this.owner});
      if (owner) {
        return owner.username;
      } else {
        return 'None';
      }
    };
  },
  item_status: function() {
    return this.Status;
  }
});

Template.item_list.events({
  'click .edit_item': function(e,t) {
    Session.set('mode','editing');
    Session.set('current_item',this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});


