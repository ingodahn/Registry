/**
 * Created by dahn on 20.05.2017.
 */
Template.item_details_scripts.helpers({
    selected_license: function (s) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let license = items.findOne({_id: item_id}).license;
        if (license == s) {
            return 'selected';
        }
        return '';
    },
    selected_language: function (s) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let language = items.findOne({_id: item_id}).language;
        if (language == s) {
            return 'selected';
        }
        return '';
    },
    get_author: function() {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let author = items.findOne({_id: item_id}).author;
        if (author) {
            return author;
        }
        return '';
    },
    get_format: function(f) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let format = items.findOne({_id: item_id})[f];
        if (format) {
            return format;
        }
        return '';
    }
});

Template.print_item_details_scripts.helpers({
    get_license: function () {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let license = items.findOne({_id: item_id}).license;
        if (license) {
            return license;
        }
        return '';
    },
    get_language: function () {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let language = items.findOne({_id: item_id}).language;
        var languageMap= {
            'en': 'English',
            'de': 'German',
            'fr': 'French',
            'es': 'Spanish'
        };
        var langLong=languageMap[language];
        if (langLong) {
            return langLong;
        }
        return '';
    },
    get_author: function () {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let author = items.findOne({_id: item_id}).author;
        if (author) {
            return author;
        }
        return '';
    }
});

Template.printFormat.helpers({
    has_format: function(f) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return false;
        }
        let format = items.findOne({_id: item_id})[f];
        if (format) {
            return true;
        }
        return false;
    },
    get_format: function(f) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let format = items.findOne({_id: item_id})[f];
        if (format) {
            return format;
        }
        return '';
    }
});

Template.list_item_scripts.helpers({
    get_author: function () {
        return this.author;
    }
})