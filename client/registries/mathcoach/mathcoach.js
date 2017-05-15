/**
 * Created by dahn on 13.05.2017.
 */

Template.item_details_mathcoach.helpers({
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
    selected_lti: function (s) {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let lti = items.findOne({_id: item_id}).lti;
        if (lti == s) {
            return 'selected';
        }
        return '';
    }
});

Template.print_item_details_mathcoach.helpers({
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
    get_lti: function () {
        let item_id = Session.get('current_item');
        if (! item_id) {
            return '';
        }
        let lti = items.findOne({_id: item_id}).lti;
        if (lti == 'yes') {
            return 'Yes';
        }
        return 'No';
    }
});