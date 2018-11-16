/**
 * Created by dahn on 12.05.2017.
 */

Router.route('/', function() {
    Meteor.subscribe("AllItems");
    Session.set('itemType','all');
    this.render('main_page')
});

Router.route('/:itemType', function() {
    let type=this.params.itemType.toLowerCase();
    if (['scripts','mathcoach','sagecell'].includes(type)) {
        Meteor.subscribe("Items",type);
        Session.set('itemType',type);
        this.render("main_page");
    } else {
        switch(type) {
            case 'backup':
                //Meteor.subscribe("AllItems").ready();
                Session.set('itemType','all');
                this.render('Backup');
                break;
            default:
                Meteor.subscribe("AllItems");
                Session.set('itemType','all');
                this.render('main_page');
        }
    }

});
