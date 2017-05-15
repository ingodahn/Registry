/**
 * Created by dahn on 15.05.2017.
 */

Template.item_details_sagecell.helpers({
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
    }
});

Template.print_item_details_sagecell.helpers({
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
    }
});