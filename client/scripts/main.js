// Imports

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// main_page
Template.main_page.helpers({
    registry_heading: function() {
        var itemType=Session.get('itemType');
        switch(itemType) {
            case 'mathcoach':
                return 'MathCoach Questions';
                break;
            case 'sagecell':
                return 'SageCell Worksheets';
                break;
            case 'scripts':
                return 'NetMath Scripts';
                break;
            case 'all':
                return 'Teaching and Learning Math';
                break;
            default:
                return 'Items of Unknown Type'
        }
    },
    specificItems: function() {
        if (Session.equals('itemType','all')) {
            return false;
        } else {
            return true;
        }
    },
    itemType: function() {
        return Session.get('itemType');
    },
    is_admin: function() {
        if (! Meteor.userId()) {
            return false;
        }
        let user=Meteor.users.findOne({_id: Meteor.userId()});
        if (! user) {
            return false;
        }
        if (user.username == 'admin') {
            return true;
        }
        return false;
    }
});

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
  },
    currentItemType: function() {
      var itemType=Session.get('itemType');
      switch(itemType) {
          case 'mathcoach':
              return 'Current Question';
              break;
          case 'sagecell':
              return 'Current Worksheet';
              break;
          case 'scripts':
              return 'Current Script';
              break;
          default:
              return 'Current Item';
      }
    }
});

// mode

Template.mode.helpers({
  can_add: function() {
      let itemType=Session.get('itemType');
    if (Meteor.userId() && itemType != 'all') {
      return true;
    } else {
      return false;
    }
  },
    searchTerm: function() {
      let searchTerm=Session.get('search_term');
      if (searchTerm) {
          return searchTerm;
      } else {
          return '';
      }
    },
    allItems: function() {
      return Session.equals('itemType','all');
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
    if (title == "") {
      alert('Title must not be empty.');
    } else if (description == "") {
      alert('Description must not be empty.');
    } else  if (url == "") {
      alert('URL must not be empty');
    } else {
        var itemType=Session.get('itemType');
        var today=new Date();
        var item={
            Title: title,
            Description: description,
            URL: url,
            Status: status,
            owner: Meteor.userId(),
            itemType: itemType,
            last_modified: today
        }
        switch(itemType) {
            case 'mathcoach':
                add_item_field(item,'#add-license','license',t);
                add_item_field(item,'#add-lti','lti',t);
                break;
            case 'sagecell':
                add_item_field(item,'#add-license','license',t);
                add_item_field(item,'#add-language','language',t);
                add_item_field(item,'#add-documentation','documentation',t);
                break;
            case 'scripts':
                add_item_field(item,'#add-author','author',t);
                add_item_field(item,'#add-license','license',t);
                add_item_field(item,'#add-language','language',t);
                add_item_field(item,'#add-imscp','imscp',t);
                break;
            default:
        }
        items.insert(item);
        Session.set('mode','home');
    }
  },
  'click #btnCancelNewItem': function(e,t) {
    Session.set('mode','home');
  }
});

// add_item_specific

Template.add_item_specific.helpers({
   get_specific_fields: function() {
     var itemType =Session.get('itemType');
     switch(itemType){
         case 'mathcoach':
             return Template.add_item_mathcoach;
             break;
         case 'sagecell':
             return Template.add_item_sagecell;
             break;
         case 'scripts':
             return Template.add_item_scripts;
             break;
         default:
             return '';
     }
   }
});

// item_details_specific

Template.item_details_specific.helpers({
    get_specific_fields: function() {
        let item=items.findOne({_id: Session.get('current_item')});
        let itemType =item.itemType;
        switch(itemType){
            case 'mathcoach':
                return Template.item_details_mathcoach;
                break;
            case 'sagecell':
                return Template.item_details_sagecell;
                break;
            case 'scripts':
                return Template.item_details_scripts;
            default:
                return '';
        }
    }
});

// item_details_specific_print

Template.item_details_specific_print.helpers({
    get_specific_fields: function() {
        let item=items.findOne({_id: Session.get('current_item')});
        let itemType =item.itemType;
        switch(itemType){
            case 'mathcoach':
                return Template.print_item_details_mathcoach;
                break;
            case 'sagecell':
                return Template.print_item_details_sagecell;
                break;
            case 'scripts':
                return Template.print_item_details_scripts;
                break;
            default:
                return '';
        }
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
    item=items.findOne({_id: item_id});
    if (! item){
        return '';
    }
    owner_id =item.owner;
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
    switch(status) {
        case 'public':
            return 'Public';
            break;
        case 'private':
            return 'Private';
            break;
        case 'deprecated':
            return 'Deprecated';
            break;
        default:
            return status;
    }
    return status;
  },
  can_modify: function () {
    if (! Meteor.userId()) {
      return false;
    }
    let item_id = Session.get('current_item');
    if (! item_id) {
        return false;
    }
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
  },
    last_modified: function () {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        var item = items.findOne({_id: item_id});
        if (item.last_modified) {
            return item.last_modified.toLocaleString();
        } else {
            return '';
        }
    },
    current_item: function() {
        //if (Session.equals('current_item',null)) {
            return '';
       // } else {
       //     return Session.get('current_item');
        //}
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
      sAlert.error('Der Titel darf nicht leer sein - Title must not be empty.',{position: 'bottom'});
    } else if (description == "") {
      sAlert.error('Die Beschreibung darf nicht leer sein - Description must not be empty.',{position: 'bottom'});
    } else  if (url == "") {
      sAlert.error('Bitte geben Sie eine gültige URL ein - URL must not be valid.',{position: 'bottom'});
    } else {
      let this_id=Session.get('current_item');
        var today=new Date();
        var item = {Title: title, Description: description, URL: url, Status: status, last_modified: today};
      if (owner_select) {
        item.owner = owner_select.value;
      }
      var itemType = Session.get('itemType');
      switch(itemType) {
          case 'mathcoach':
            add_item_field(item,'#add-license','license',t);
            add_item_field(item,'#add-lti','lti',t);
            break;
          case 'sagecell':
              add_item_field(item,'#add-license','license',t);
              add_item_field(item,'#add-language','language',t);
              add_item_field(item,'#add-documentation','documentation',t);
              break;
          case 'scripts':
              add_item_field(item,'#add-author','author',t);
              add_item_field(item,'#add-license','license',t);
              add_item_field(item,'#add-language','language',t);
              add_item_field(item,'#add-imscp','imscp',t);
              break;
          default:
      }
      items.update(this_id,{$set: item});
      Session.set('mode','home');
      Session.set('current_item',null);
    }
  } catch(err) {
      console.log('ERROR Saving Item')
    sAlert.error(err.message);
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
  items : function() {
      let search_term = Session.get('search_term');
      let itemType = Session.get('itemType');
      if (itemType == 'all' && search_term.length < 3) {
          return [];
      }
      let itemList = items.find(
          {
              $or: [
                  {Title: {$regex: search_term, $options: 'i'}},
                  {Description: {$regex: search_term, $options: 'i'}}
              ]
          },
          {sort: {last_modified: -1}}
      );
      if (itemList.count() == 0) {
          sAlert.info('Nichts gefunden - Nothing found',{position: 'bottom'});
          return false;
      };
      return itemList;
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
  },
  list_heading_specific: function() {
      let itemType = Session.get('itemType');
      switch (itemType) {
          case 'scripts':
              return Template.list_heading_scripts;
              break;
          case 'all':
              return Template.list_heading_all;
              break;
          default:
              return Template.empty;

      }
  },
  list_item_specific: function() {
      let itemType = Session.get('itemType');
      switch(itemType) {
          case 'scripts':
              return Template.list_item_scripts;
              break;
          case 'all':
              return Template.list_item_all;
              break;
          default:
              return Template.empty;
      }
  },
  logged_in: function() {
      if (Meteor.userId()) {
          return true;
      }
      return false;
  }
});

Template.item_list.events({
  'click .edit_item': function(e,t) {
    Session.set('mode','editing');
    Session.set('current_item',this._id);
    // Session.set('itemType',this.itemType);
  }
});

// Backup

Template.Backup.helpers({
    backupAll: function() {
        /*
        let deny='Admin only';
        if (! Meteor.userId()) {
            return deny;
        }
        let user=Meteor.users.findOne({_id: Meteor.userId()});
        if (! user) {
            return deny;
        }
        if (user.username != 'admin') {
            return deny;
        }
        */
        var ready=Meteor.subscribe("AllItems").ready();
        var backupItems=collectBackupItems();
        if (ready) {
            console.log(backupItems);
            //var syncFunc = Meteor.wrapAsync(sendBackupItems);
            //syncFunc(backupItems);
            let backupString = sendBackupItems(backupItems);
            //var FileSaver = require('filesaver');
            var blob=new Blob([backupString],{type: "text/plain;charset=utf-8"});
            saveAs(blob,"backup.txt");
            return backupString;
        }
/*
        return {
            ready: ready
        }
        */
    },
});

function add_item_field(item,formFieldName,itemFieldName,t) {
    var itemField=t.find(formFieldName).value;
    item[itemFieldName]=itemField;
};

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

function collectBackupItems () {
    let backup = {};
    let allItems=[];
    items.find({}).forEach(
        function(doc) {
            allItems.push(doc);
        }
    );
    let allUsers = [];
    Meteor.users.find({}).forEach(
        function(u) {
            allUsers.push(u);
        }
    );
    backup.items=allItems;
    let user=Meteor.users.findOne({_id: Meteor.userId()});
    if (user && user.username == 'admin')
      backup.users=allUsers;
    let date = new Date();
    backup.date=date;
    return backup;
};
function sendBackupItems(backup) {
    return JSON.stringify(backup,null,"\t");
    //download(backupData,"regBackup.js","application/json");
};


// General functions //
