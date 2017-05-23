/**
 * Created by dahn on 23.05.2017.
 */
Template.list_item_all.helpers({
    get_itemType_image: function () {
        let itemType=(this.itemType);
        switch(itemType) {
            case 'scripts':
                return "scripts.png";
                break;
            case "sagecell":
                return "sagecell.png";
            case 'mathcoach':
                return "mathcoach.png";
                break;
            default:
                return '';
        }
    }
})